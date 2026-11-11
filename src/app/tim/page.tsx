import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

export const metadata: Metadata = { title: "Tìm cá & sản phẩm" };

export default function Page() {
  return (
    <PageStub
      eyebrow="Tìm cá"
      title="Tìm cá & sản phẩm"
      description="Tìm theo loài, khu vực, khoảng giá và so giá giữa các nơi."
      todo={["Từ khoá, danh mục, loài, tỉnh/phường, khoảng giá", "Chỉ tiệm / chỉ cá nhân, chỉ còn hàng", "Sắp xếp mới nhất, giá tăng/giảm"]}
    />
  );
}
