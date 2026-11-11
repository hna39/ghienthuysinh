import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Viết bài mới" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Diễn đàn"
      title="Viết bài mới"
      description="Đặt câu hỏi, chia sẻ kinh nghiệm hoặc khoe bể."
      todo={["Chọn chuyên mục & loại bài", "Soạn thảo + tải ảnh (tối đa 10)", "Thêm thẻ"]}
    />
  );
}
