import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Bảng quản trị" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Quản trị"
      title="Bảng quản trị"
      description="Chỉ dành cho quản trị viên."
      todo={["Tổng quan số liệu, báo cáo chờ xử lý", "Duyệt/xác minh tiệm, khoá người dùng, cấp huy hiệu", "Soạn hồ sơ loài & cẩm nang", "Đăng giúp tiệm đối tác rồi chuyển quyền"]}
    />
  );
}
