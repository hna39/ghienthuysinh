import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Chưa có website? Có ngay trang tiệm online" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Dành cho tiệm"
      title="Chưa có website? Có ngay trang tiệm online"
      description="Không cần tự làm web, không cần biết công nghệ. Tạo tài khoản người bán là có."
      todo={["Lợi ích: trang tiệm riêng, khách quanh bạn tìm thấy, một đường link để chia sẻ", "Đăng sản phẩm & combo bể mẫu", "Nút Mở trang tiệm"]}
    />
  );
}
