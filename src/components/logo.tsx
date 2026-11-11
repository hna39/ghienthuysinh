import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${site.name} — Trang chủ`}>
      <span className="relative block size-9 overflow-hidden rounded-full bg-reu ring-1 ring-vang/40">
        <Image src="/brand/logo-koi.png" alt="" fill sizes="36px" className="object-contain p-0.5" priority />
      </span>
      <span
        className={`font-tieu-de text-lg leading-none font-semibold whitespace-nowrap ${
          inverted ? "text-kem" : "text-reu"
        }`}
      >
        {site.name}
      </span>
    </Link>
  );
}
