import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Combo bể mẫu" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Bóc giá hồ"
      title="Combo bể mẫu"
      description="Bể mẫu do tiệm đăng, bóc giá từng món. Thích bể nào, liên hệ tiệm mua trọn combo về tự setup."
      todo={["Lọc theo ngân sách, kích thước bể, phong cách, khu vực", "Thẻ combo: ảnh bể, tổng chi phí, tiệm"]}
    />
  );
}
