import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Liên hệ" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Thông tin"
      title="Liên hệ"
      description="Liên hệ đội ngũ Ghiền Thủy Sinh."
      todo={["Fanpage, Email", "Hợp tác với tiệm"]}
    />
  );
}
