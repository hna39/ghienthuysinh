import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Tiệm quanh bạn" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tiệm thủy sinh"
      title="Tiệm quanh bạn"
      description="Danh sách tiệm thủy sinh trên Ghiền Thủy Sinh."
      todo={["Lọc theo tỉnh/thành, phường/xã", "Tìm theo tên tiệm", "Huy hiệu Đã xác minh"]}
    />
  );
}
