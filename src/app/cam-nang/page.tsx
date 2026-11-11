import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Cẩm nang người mới" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Thư viện kiến thức"
      title="Cẩm nang người mới"
      description="Hướng dẫn từng bước do Ghiền Thủy Sinh biên soạn."
      todo={["Set bể đầu tiên, chạy vi sinh", "Chọn cá dễ nuôi, xử lý rêu, bệnh thường gặp", "8 bài khởi đầu"]}
    />
  );
}
