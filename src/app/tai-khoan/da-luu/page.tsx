import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Đã lưu" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tài khoản"
      title="Đã lưu"
      description="Tin đăng, người bán và combo bạn đã lưu."
      todo={["Danh sách tin đăng đã lưu", "Người bán quen", "Combo đã lưu"]}
    />
  );
}
