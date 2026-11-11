import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Học chơi cá từ người đi trước" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Diễn đàn"
      title="Học chơi cá từ người đi trước"
      description="Hỏi là có người trả lời: người chơi lâu năm và chủ tiệm cùng chia sẻ kinh nghiệm."
      todo={["6 chuyên mục", "Bài Mới nhất · Nổi bật · Chưa có trả lời", "Tìm kiếm, lọc theo thẻ"]}
    />
  );
}
