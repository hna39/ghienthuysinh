import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Đăng nhập" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tài khoản"
      title="Đăng nhập"
      description="Đăng nhập bằng email và mật khẩu."
      todo={["Đăng nhập email + mật khẩu", "Ghi nhớ đăng nhập", "Đăng nhập Google (giai đoạn 2)"]}
    />
  );
}
