# Ghiền Thủy Sinh — web chính (Next.js)

Trang giới thiệu + sàn trưng bày cá cảnh & thủy sinh trên **ghienthuysinh.com**.
Danh sách chức năng đầy đủ: `../KE-HOACH-CHUC-NANG.md`.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Kết nối Supabase (khi có tài khoản)

1. Tạo project tại https://supabase.com (chọn vùng Singapore cho gần Việt Nam).
2. SQL Editor → dán toàn bộ `supabase/migrations/0001_init.sql` → Run.
3. Sao chép `.env.example` thành `.env.local`, điền URL và anon key (Project Settings → API).

## Cấu trúc

- `src/app/` — các trang (mỗi thư mục là một đường dẫn, ví dụ `src/app/combo/[slug]` → `/combo/ten-combo`)
- `src/components/` — thành phần giao diện dùng chung (header, footer, logo...)
- `src/lib/site.ts` — tên trang, menu, link liên hệ
- `src/lib/supabase/` — kết nối cơ sở dữ liệu
- `supabase/migrations/` — cấu trúc cơ sở dữ liệu
- `public/` — logo, hình minh hoạ, ảnh

## Ghi chú kỹ thuật

- Next.js 16: `params`, `searchParams`, `cookies()` đều phải `await`; file `middleware` đổi tên thành `proxy`.
- Không bật `cacheComponents` (xem `next.config.ts`).
