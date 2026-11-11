import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Không bật cacheComponents: trang của sàn đọc phiên đăng nhập (cookie) và dữ liệu mới ở mỗi lần mở,
  // dùng cách dựng trang thông thường cho đơn giản và ít lỗi với Supabase.
  // Trang chủ "/" = landing page gốc (public/index.html), giữ nguyên như bản đã duyệt.
  // Các trang của sàn (diễn đàn, tin đăng, trang tiệm...) do Next.js dựng ở các đường dẫn khác.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }],
    };
  },
  images: {
    remotePatterns: [
      // Ảnh người dùng tải lên Supabase Storage
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
