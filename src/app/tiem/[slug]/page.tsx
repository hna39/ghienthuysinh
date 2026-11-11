import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/tiem/[slug]">) {
  const { slug } = await props.params;
  return (
    <PageStub
      eyebrow="Trang tiệm"
      title="Trang tiệm"
      description="Thông tin, sản phẩm và combo bể mẫu của một tiệm."
      detail={`/tiem/${slug}`}
      todo={["Logo, ảnh bìa, giới thiệu, địa chỉ, giờ mở cửa (đang mở/đã đóng)", "Nút Gọi · Zalo · Chỉ đường · Chia sẻ, mã QR", "Sản phẩm đang bán và combo bể mẫu"]}
    />
  );
}
