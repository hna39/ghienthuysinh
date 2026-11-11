-- =====================================================================
-- Ghiền Thủy Sinh — cơ sở dữ liệu khởi tạo
-- Chạy trong Supabase: SQL Editor → dán toàn bộ file → Run
-- Mô hình: nơi trưng bày (không có đơn hàng / thanh toán / vận chuyển)
-- =====================================================================

-- ---------- Kiểu dữ liệu ----------
create type user_role       as enum ('buyer', 'seller', 'admin');
create type seller_kind     as enum ('shop', 'individual');
create type species_group   as enum ('fish', 'shrimp', 'snail', 'plant', 'other');
create type listing_category as enum ('fish', 'shrimp', 'snail', 'plant', 'equipment', 'other');
create type listing_status  as enum ('available', 'sold_out', 'hidden');
create type price_kind      as enum ('fixed', 'range', 'contact');
create type combo_item_kind as enum ('tank', 'light', 'filter', 'substrate', 'hardscape', 'plant', 'livestock', 'accessory', 'labor');
create type publish_status  as enum ('draft', 'published', 'hidden');
create type post_kind       as enum ('discussion', 'question', 'showcase');
create type target_kind     as enum ('post', 'comment', 'listing', 'combo', 'shop', 'profile');
create type saved_kind      as enum ('listing', 'combo', 'shop', 'seller');
create type report_status   as enum ('open', 'resolved', 'dismissed');

-- ---------- Hàm tiện ích ----------
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------- Hồ sơ người dùng ----------
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique not null check (username ~ '^[a-z0-9_\.]{3,30}$'),
  full_name    text not null default '',
  avatar_url   text,
  phone        text,
  show_phone   boolean not null default false,
  province     text,            -- tỉnh/thành (34 tỉnh thành sau sáp nhập 2025)
  ward         text,            -- phường/xã
  role         user_role not null default 'buyer',
  seller_type  seller_kind,     -- chỉ có khi role = seller
  badges       text[] not null default '{}',   -- 'expert' | 'editor' | ...
  interests    text,
  bio          text,
  is_banned    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint seller_type_only_for_sellers check (role <> 'seller' or seller_type is not null)
);
create trigger profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and not is_banned);
$$;

create or replace function public.is_active_user() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and not is_banned);
$$;

-- Không cho người dùng tự đổi vai trò admin, huy hiệu, trạng thái khoá
create or replace function public.protect_profile_columns() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    if new.role = 'admin' and old.role <> 'admin' then
      raise exception 'Không được tự cấp quyền quản trị';
    end if;
    if new.role = 'buyer' and old.role = 'seller' then
      new.role := old.role; -- người bán không tự hạ vai trò (liên hệ quản trị)
    end if;
    new.badges := old.badges;
    new.is_banned := old.is_banned;
  end if;
  return new;
end $$;
create trigger profiles_protect before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- Tạo hồ sơ khi đăng ký (thông tin lấy từ options.data lúc signUp)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  base text := lower(regexp_replace(split_part(coalesce(new.email, 'nguoichoi'), '@', 1), '[^a-z0-9_\.]', '', 'g'));
  uname text;
  r user_role := case when meta->>'role' = 'seller' then 'seller'::user_role else 'buyer'::user_role end;
begin
  if length(base) < 3 then base := 'nguoichoi'; end if;
  uname := left(base, 22) || substr(md5(new.id::text), 1, 6);
  insert into public.profiles (id, username, full_name, phone, province, ward, role, seller_type, interests, show_phone)
  values (
    new.id, uname,
    coalesce(meta->>'full_name', ''),
    meta->>'phone', meta->>'province', meta->>'ward',
    r,
    case when r = 'seller' then coalesce((meta->>'seller_type')::seller_kind, 'individual') end,
    meta->>'interests',
    (r = 'seller' and meta->>'seller_type' = 'individual')   -- người bán cá nhân: hiện SĐT để liên hệ
  );
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Hồ sơ công khai: ẩn SĐT nếu người dùng không bật hiển thị
create view public.public_profiles with (security_invoker = false) as
  select id, username, full_name, avatar_url, province, ward, role, seller_type, badges, bio, created_at,
         case when show_phone then phone end as phone
  from public.profiles
  where not is_banned;

-- ---------- Tiệm ----------
create table public.shops (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid references public.profiles (id) on delete set null,  -- null khi quản trị đăng giúp, chưa chuyển quyền
  name          text not null,
  slug          text unique not null check (slug ~ '^[a-z0-9-]{3,60}$'),
  logo_url      text,
  cover_url     text,
  description   text,
  address       text not null,
  province      text not null,
  ward          text,
  map_url       text,
  phone         text,
  zalo          text,
  facebook_url  text,
  tiktok_url    text,
  is_verified   boolean not null default false,
  status        publish_status not null default 'published',
  created_by    uuid references public.profiles (id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index shops_province_idx on public.shops (province, ward);
create trigger shops_updated before update on public.shops for each row execute function public.set_updated_at();

create table public.shop_hours (
  shop_id  uuid references public.shops (id) on delete cascade,
  weekday  smallint check (weekday between 0 and 6),  -- 0 = Chủ nhật
  opens    time,
  closes   time,
  closed   boolean not null default false,
  primary key (shop_id, weekday)
);

create or replace function public.can_edit_shop(sid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (select 1 from public.shops where id = sid and owner_id = auth.uid());
$$;

-- ---------- Thư viện kiến thức ----------
create table public.species (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name_vi       text not null,
  name_sci      text,
  other_names   text[] not null default '{}',
  "group"       species_group not null default 'fish',
  difficulty    smallint not null default 1 check (difficulty between 1 and 3),  -- 1 dễ, 2 vừa, 3 khó
  beginner_friendly boolean not null default false,
  max_size_cm   numeric,
  temp_min      numeric, temp_max numeric,
  ph_min        numeric, ph_max numeric,
  min_tank_l    integer,
  diet          text,
  temperament   text,
  compatible    text,
  breeding      text,
  price_ref     text,          -- giá tham khảo, dạng chữ
  image_url     text,
  body          text,          -- nội dung chi tiết (markdown)
  status        publish_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger species_updated before update on public.species for each row execute function public.set_updated_at();

create table public.guides (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  cover_url   text,
  body        text not null default '',
  author_id   uuid references public.profiles (id),
  status      publish_status not null default 'draft',
  published_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger guides_updated before update on public.guides for each row execute function public.set_updated_at();

-- ---------- Tin đăng ----------
create table public.listings (
  id           uuid primary key default gen_random_uuid(),
  seller_id    uuid not null references public.profiles (id) on delete cascade,
  shop_id      uuid references public.shops (id) on delete set null,
  species_id   uuid references public.species (id) on delete set null,
  category     listing_category not null,
  title        text not null check (length(title) between 3 and 120),
  description  text,
  price_type   price_kind not null default 'fixed',
  price_min    integer check (price_min >= 0),
  price_max    integer check (price_max >= 0),
  unit         text not null default 'con',   -- con, cặp, bầy, lô, cây, bộ
  size         text,
  quantity     integer check (quantity >= 0),
  status       listing_status not null default 'available',
  province     text,
  ward         text,
  video_url    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint price_present check (price_type = 'contact' or price_min is not null)
);
create index listings_search_idx on public.listings (status, category, province);
create index listings_species_idx on public.listings (species_id) where status = 'available';
create trigger listings_updated before update on public.listings for each row execute function public.set_updated_at();

create table public.listing_images (
  id          uuid primary key default gen_random_uuid(),
  listing_id  uuid not null references public.listings (id) on delete cascade,
  url         text not null,
  position    smallint not null default 0
);

-- ---------- Combo bể mẫu (bóc giá hồ) ----------
create table public.combos (
  id           uuid primary key default gen_random_uuid(),
  shop_id      uuid not null references public.shops (id) on delete cascade,
  slug         text unique not null check (slug ~ '^[a-z0-9-]{3,80}$'),
  title        text not null,
  tank_length_cm integer, tank_width_cm integer, tank_height_cm integer,
  style        text,             -- Thủy sinh rừng, Iwagumi, Mini...
  description  text,
  cover_url    text,
  video_url    text,
  total_price  integer not null default 0,   -- tự tính từ combo_items
  status       publish_status not null default 'published',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index combos_price_idx on public.combos (status, total_price);
create trigger combos_updated before update on public.combos for each row execute function public.set_updated_at();

create table public.combo_items (
  id          uuid primary key default gen_random_uuid(),
  combo_id    uuid not null references public.combos (id) on delete cascade,
  kind        combo_item_kind not null,
  name        text not null,
  quantity    numeric not null default 1 check (quantity > 0),
  unit_price  integer not null default 0 check (unit_price >= 0),
  listing_id  uuid references public.listings (id) on delete set null,
  position    smallint not null default 0
);

create or replace function public.recalc_combo_total() returns trigger
language plpgsql security definer set search_path = public as $$
declare cid uuid := coalesce(new.combo_id, old.combo_id);
begin
  update public.combos
     set total_price = coalesce((select round(sum(quantity * unit_price)) from public.combo_items where combo_id = cid), 0)
   where id = cid;
  return null;
end $$;
create trigger combo_items_total after insert or update or delete on public.combo_items
  for each row execute function public.recalc_combo_total();

-- ---------- Diễn đàn ----------
create table public.forum_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  position    smallint not null default 0
);

create table public.posts (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid not null references public.forum_categories (id),
  author_id     uuid not null references public.profiles (id) on delete cascade,
  kind          post_kind not null default 'discussion',
  title         text not null check (length(title) between 5 and 160),
  body          text not null default '',
  images        text[] not null default '{}',
  tags          text[] not null default '{}',
  is_pinned     boolean not null default false,
  is_locked     boolean not null default false,
  is_hidden     boolean not null default false,
  best_comment_id uuid,
  view_count    integer not null default 0,
  comment_count integer not null default 0,
  like_count    integer not null default 0,
  last_activity_at timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index posts_category_idx on public.posts (category_id, is_hidden, last_activity_at desc);
create trigger posts_updated before update on public.posts for each row execute function public.set_updated_at();

create table public.comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.posts (id) on delete cascade,
  author_id   uuid not null references public.profiles (id) on delete cascade,
  parent_id   uuid references public.comments (id) on delete cascade,  -- lồng 1 cấp
  body        text not null check (length(body) between 1 and 10000),
  is_hidden   boolean not null default false,
  like_count  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index comments_post_idx on public.comments (post_id, created_at);
create trigger comments_updated before update on public.comments for each row execute function public.set_updated_at();
alter table public.posts add constraint posts_best_comment_fk
  foreign key (best_comment_id) references public.comments (id) on delete set null;

create or replace function public.bump_comment_count() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.posts set comment_count = comment_count + 1, last_activity_at = now() where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.posts set comment_count = greatest(comment_count - 1, 0) where id = old.post_id;
  end if;
  return null;
end $$;
create trigger comments_count after insert or delete on public.comments
  for each row execute function public.bump_comment_count();

create table public.reactions (
  user_id     uuid not null references public.profiles (id) on delete cascade,
  target_type target_kind not null check (target_type in ('post', 'comment')),
  target_id   uuid not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, target_type, target_id)
);

create or replace function public.bump_like_count() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  d int;
  t target_kind;
  tid uuid;
begin
  if tg_op = 'INSERT' then
    d := 1; t := new.target_type; tid := new.target_id;
  else
    d := -1; t := old.target_type; tid := old.target_id;
  end if;
  if t = 'post' then
    update public.posts set like_count = greatest(like_count + d, 0) where id = tid;
  else
    update public.comments set like_count = greatest(like_count + d, 0) where id = tid;
  end if;
  return null;
end $$;
create trigger reactions_count after insert or delete on public.reactions
  for each row execute function public.bump_like_count();

-- ---------- Đã lưu & báo cáo ----------
create table public.saved_items (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  item_type  saved_kind not null,
  item_id    uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create table public.reports (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles (id) on delete set null,
  target_type target_kind not null,
  target_id   uuid not null,
  reason      text not null,
  note        text,
  status      report_status not null default 'open',
  handled_by  uuid references public.profiles (id),
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- Phân quyền (Row Level Security)
-- =====================================================================
alter table public.profiles         enable row level security;
alter table public.shops            enable row level security;
alter table public.shop_hours       enable row level security;
alter table public.species          enable row level security;
alter table public.guides           enable row level security;
alter table public.listings         enable row level security;
alter table public.listing_images   enable row level security;
alter table public.combos           enable row level security;
alter table public.combo_items      enable row level security;
alter table public.forum_categories enable row level security;
alter table public.posts            enable row level security;
alter table public.comments         enable row level security;
alter table public.reactions        enable row level security;
alter table public.saved_items      enable row level security;
alter table public.reports          enable row level security;

-- Hồ sơ: tự xem/sửa của mình; người khác xem qua view public_profiles
create policy "profiles: xem của mình hoặc quản trị" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles: sửa của mình hoặc quản trị" on public.profiles for update using (id = auth.uid() or public.is_admin());
grant select on public.public_profiles to anon, authenticated;

-- Tiệm
create policy "shops: ai cũng xem tiệm đang hiện" on public.shops for select using (status = 'published' or public.can_edit_shop(id));
create policy "shops: người bán tạo tiệm của mình" on public.shops for insert
  with check (public.is_admin() or (owner_id = auth.uid() and public.is_active_user()));
create policy "shops: chủ tiệm/quản trị sửa" on public.shops for update using (public.can_edit_shop(id));
create policy "shops: quản trị xoá" on public.shops for delete using (public.is_admin());

create policy "shop_hours: ai cũng xem" on public.shop_hours for select using (true);
create policy "shop_hours: chủ tiệm sửa" on public.shop_hours for all using (public.can_edit_shop(shop_id)) with check (public.can_edit_shop(shop_id));

-- Kiến thức: xem bài đã đăng; quản trị viết
create policy "species: xem đã đăng" on public.species for select using (status = 'published' or public.is_admin());
create policy "species: quản trị viết" on public.species for all using (public.is_admin()) with check (public.is_admin());
create policy "guides: xem đã đăng" on public.guides for select using (status = 'published' or public.is_admin());
create policy "guides: quản trị viết" on public.guides for all using (public.is_admin()) with check (public.is_admin());

-- Tin đăng
create policy "listings: xem tin đang hiện" on public.listings for select
  using (status <> 'hidden' or seller_id = auth.uid() or public.is_admin());
create policy "listings: người bán tạo" on public.listings for insert
  with check (public.is_admin() or (seller_id = auth.uid() and public.is_active_user()
              and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'seller')
              and (shop_id is null or public.can_edit_shop(shop_id))));
create policy "listings: người bán sửa của mình" on public.listings for update using (seller_id = auth.uid() or public.is_admin());
create policy "listings: người bán xoá của mình" on public.listings for delete using (seller_id = auth.uid() or public.is_admin());

create policy "listing_images: ai cũng xem" on public.listing_images for select using (true);
create policy "listing_images: chủ tin sửa" on public.listing_images for all
  using (exists (select 1 from public.listings l where l.id = listing_id and (l.seller_id = auth.uid() or public.is_admin())))
  with check (exists (select 1 from public.listings l where l.id = listing_id and (l.seller_id = auth.uid() or public.is_admin())));

-- Combo
create policy "combos: xem combo đang hiện" on public.combos for select using (status = 'published' or public.can_edit_shop(shop_id));
create policy "combos: chủ tiệm viết" on public.combos for all using (public.can_edit_shop(shop_id)) with check (public.can_edit_shop(shop_id));
create policy "combo_items: ai cũng xem" on public.combo_items for select using (true);
create policy "combo_items: chủ tiệm viết" on public.combo_items for all
  using (exists (select 1 from public.combos c where c.id = combo_id and public.can_edit_shop(c.shop_id)))
  with check (exists (select 1 from public.combos c where c.id = combo_id and public.can_edit_shop(c.shop_id)));

-- Diễn đàn
create policy "categories: ai cũng xem" on public.forum_categories for select using (true);
create policy "categories: quản trị viết" on public.forum_categories for all using (public.is_admin()) with check (public.is_admin());

create policy "posts: xem bài không bị ẩn" on public.posts for select using (not is_hidden or author_id = auth.uid() or public.is_admin());
create policy "posts: thành viên viết" on public.posts for insert with check (author_id = auth.uid() and public.is_active_user());
create policy "posts: tác giả/quản trị sửa" on public.posts for update using (author_id = auth.uid() or public.is_admin());
create policy "posts: tác giả/quản trị xoá" on public.posts for delete using (author_id = auth.uid() or public.is_admin());

create policy "comments: xem không bị ẩn" on public.comments for select using (not is_hidden or author_id = auth.uid() or public.is_admin());
create policy "comments: thành viên viết (bài không khoá)" on public.comments for insert
  with check (author_id = auth.uid() and public.is_active_user()
              and exists (select 1 from public.posts p where p.id = post_id and not p.is_locked and not p.is_hidden));
create policy "comments: tác giả/quản trị sửa" on public.comments for update using (author_id = auth.uid() or public.is_admin());
create policy "comments: tác giả/quản trị xoá" on public.comments for delete using (author_id = auth.uid() or public.is_admin());

create policy "reactions: ai cũng xem" on public.reactions for select using (true);
create policy "reactions: tự thả/bỏ tim" on public.reactions for insert with check (user_id = auth.uid() and public.is_active_user());
create policy "reactions: tự bỏ tim" on public.reactions for delete using (user_id = auth.uid());

-- Đã lưu: chỉ của mình
create policy "saved: của mình" on public.saved_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Báo cáo: thành viên gửi; quản trị xem/xử lý
create policy "reports: thành viên gửi" on public.reports for insert with check (reporter_id = auth.uid());
create policy "reports: quản trị xem" on public.reports for select using (public.is_admin());
create policy "reports: quản trị xử lý" on public.reports for update using (public.is_admin());

-- =====================================================================
-- Dữ liệu khởi đầu
-- =====================================================================
insert into public.forum_categories (slug, name, description, position) values
  ('nguoi-moi',     'Người Mới Bắt Đầu', 'Hỏi gì cũng được, không có câu hỏi ngớ ngẩn.', 1),
  ('set-be-vi-sinh','Set Bể & Vi Sinh',  'Chu trình nitơ, lọc, thay nước, thông số nước.', 2),
  ('ca-canh',       'Cá Cảnh Theo Loài', 'Betta, guppy, cá dĩa, cá rồng, tép, ốc...', 3),
  ('cay-layout',    'Cây & Layout',      'Chọn cây, phân nền, CO2, bố cục đá lũa.', 4),
  ('benh-xu-ly',    'Bệnh & Xử Lý',      'Nhận biết và xử lý bệnh cá, tép, cây.', 5),
  ('khoe-be',       'Khoe Bể',           'Khoe thành quả, xin góp ý layout.', 6);
