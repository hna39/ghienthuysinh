// Thông tin chung của trang — sửa ở đây là đổi ở mọi nơi.
export const site = {
  name: "Ghiền Thủy Sinh",
  domain: "ghienthuysinh.com",
  url: "https://ghienthuysinh.com",
  tagline: "Tìm cá cảnh, xem giá, ghé tiệm gần nhà",
  description:
    "Tra loài cá, xem giá và người bán quanh bạn, xem combo bể mẫu bóc giá từng món từ các tiệm, học kinh nghiệm trên diễn đàn. Tiệm chưa có website cũng có ngay trang tiệm online.",
  // Link liên hệ (email điền khi có)
  contact: {
    fanpage: "https://www.facebook.com/profile.php?id=61596057494276",
    email: "",
  },
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/combo", label: "Bóc Giá Hồ" },
  { href: "/tim", label: "Tìm Cá" },
  { href: "/dien-dan", label: "Diễn Đàn" },
  { href: "/loai-ca", label: "Loài Cá" },
  { href: "/cho-tiem", label: "Cho Tiệm" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Khám Phá",
    items: [
      { href: "/tim", label: "Tìm cá & sản phẩm" },
      { href: "/combo", label: "Combo bể mẫu" },
      { href: "/tiem", label: "Tiệm thủy sinh" },
      { href: "/loai-ca", label: "Thư viện loài cá" },
    ],
  },
  {
    title: "Cộng Đồng",
    items: [
      { href: "/dien-dan", label: "Diễn đàn" },
      { href: "/cam-nang", label: "Cẩm nang người mới" },
      { href: "/cho-tiem", label: "Dành cho tiệm" },
    ],
  },
  {
    title: "Thông Tin",
    items: [
      { href: "/lien-he", label: "Liên hệ" },
      { href: "/chinh-sach-quyen-rieng-tu", label: "Chính sách quyền riêng tư" },
      { href: "/dieu-khoan", label: "Điều khoản sử dụng" },
    ],
  },
];
