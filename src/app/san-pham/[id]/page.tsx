import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/san-pham/[id]">) {
  const { id } = await props.params;
  return (
    <PageStub
      eyebrow="Tin đăng"
      title="Chi tiết sản phẩm"
      description="Ảnh, giá, người bán và nơi khác đang bán cùng loài."
      detail={`/san-pham/${id}`}
      todo={["Ảnh (tối đa 8), giá, đơn vị, kích cỡ, còn hàng", "Thông tin người bán/tiệm + nút liên hệ", "Nơi khác đang bán loài này (so giá)", "Lưu tin, báo cáo tin sai"]}
    />
  );
}
