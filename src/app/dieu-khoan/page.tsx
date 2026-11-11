import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Điều khoản sử dụng" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Thông tin"
      title="Điều khoản sử dụng"
      description="Quy định khi dùng Ghiền Thủy Sinh."
      todo={["Trách nhiệm người đăng tin & người mua", "Quy định diễn đàn", "Xử lý vi phạm"]}
    />
  );
}
