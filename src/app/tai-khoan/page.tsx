import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Cài đặt tài khoản" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tài khoản"
      title="Cài đặt tài khoản"
      description="Sửa thông tin cá nhân, ảnh đại diện, khu vực và quyền riêng tư."
      todo={["Sửa hồ sơ, ảnh đại diện, khu vực", "Bật/tắt hiện số điện thoại", "Nâng cấp Người chơi → Người bán", "Đổi mật khẩu, đăng xuất"]}
    />
  );
}
