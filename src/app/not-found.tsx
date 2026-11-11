import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-tieu-de text-7xl text-vang">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Chú cá này bơi đi mất rồi</h1>
      <p className="mt-3 text-reu/75">Trang bạn tìm không tồn tại hoặc đã bị ẩn.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-reu px-5 py-2.5 text-sm font-semibold text-kem">
          Về trang chủ
        </Link>
        <Link href="/tim" className="rounded-full border border-reu/25 px-5 py-2.5 text-sm font-semibold">
          Tìm cá
        </Link>
      </div>
    </section>
  );
}
