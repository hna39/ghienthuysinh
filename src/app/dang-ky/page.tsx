import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Tạo tài khoản miễn phí" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tài khoản"
      title="Tạo tài khoản miễn phí"
      description="Mua hay bán đều cần một tài khoản. Chọn vai trò Người chơi hoặc Người bán (có tiệm / cá nhân)."
      todo={["Form đăng ký: vai trò, họ tên, SĐT/Zalo, email, mật khẩu, khu vực", "Người bán có tiệm: tên tiệm + địa chỉ → tạo sẵn trang tiệm", "Xác nhận email, ô đồng ý điều khoản"]}
    />
  );
}
