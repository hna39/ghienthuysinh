import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Thư viện loài cá" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Thư viện kiến thức"
      title="Thư viện loài cá"
      description="Hồ sơ từng loài: điều kiện nước, kích thước bể, độ khó, giá tham khảo."
      todo={["Lọc theo nhóm (cá/tép/ốc/cây), độ khó", "Bộ lọc “dễ nuôi cho người mới”", "30 loài khởi đầu"]}
    />
  );
}
