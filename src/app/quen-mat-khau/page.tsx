import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Quên mật khẩu" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tài khoản"
      title="Quên mật khẩu"
      description="Nhập email để nhận link đặt lại mật khẩu."
      todo={["Gửi email đặt lại mật khẩu", "Trang đặt mật khẩu mới"]}
    />
  );
}
