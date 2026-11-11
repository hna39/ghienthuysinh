import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Chính sách quyền riêng tư" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Thông tin"
      title="Chính sách quyền riêng tư"
      description="Cách Ghiền Thủy Sinh thu thập và sử dụng dữ liệu của bạn."
      todo={["Dữ liệu thu thập, mục đích sử dụng, thời gian lưu", "Quyền của bạn theo Nghị định 13/2023/NĐ-CP", "Cách liên hệ để xoá dữ liệu"]}
    />
  );
}
