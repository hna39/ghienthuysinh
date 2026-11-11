import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/combo/[slug]">) {
  const { slug } = await props.params;
  return (
    <PageStub
      eyebrow="Bóc giá hồ"
      title="Chi tiết combo"
      description="Bảng bóc giá từng món và tổng chi phí của một bể mẫu."
      detail={`/combo/${slug}`}
      todo={["Ảnh/video bể thành phẩm", "Bảng bóc giá theo nhóm: bể, đèn, lọc, nền, đá lũa, cây, cá, phụ kiện, công setup", "Tổng chi phí, nút liên hệ tiệm mua trọn combo", "Combo tương tự"]}
    />
  );
}
