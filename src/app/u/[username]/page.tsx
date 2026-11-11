import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/u/[username]">) {
  const { username } = await props.params;
  return (
    <PageStub
      eyebrow="Hồ sơ"
      title="Hồ sơ thành viên"
      description="Trang công khai của một thành viên."
      detail={`/u/${username}`}
      todo={["Ảnh, tên, vai trò & huy hiệu, khu vực, ngày tham gia", "Bài viết diễn đàn", "Tin đăng (nếu là người bán)"]}
    />
  );
}
