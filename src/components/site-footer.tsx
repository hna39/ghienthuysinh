import Link from "next/link";
import { Logo } from "@/components/logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const contacts = [
    { label: "Fanpage", href: site.contact.fanpage },
    { label: "Email", href: site.contact.email ? `mailto:${site.contact.email}` : "" },
  ];

  return (
    <footer className="mt-auto bg-reu text-kem">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-kem/75">
            {site.tagline}. Nơi trưng bày cá cảnh &amp; thủy sinh: người chơi tìm cá và người bán quanh mình, tiệm chưa có
            website cũng có ngay trang tiệm online.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {contacts.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-kem/25 px-3 py-1.5 text-xs hover:border-vang hover:text-vang"
                  >
                    {c.label}
                  </a>
                ) : (
                  <span className="inline-block rounded-full border border-kem/15 px-3 py-1.5 text-xs text-kem/45" title="Sắp cập nhật">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <p className="font-tieu-de text-base text-vang">{group.title}</p>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-kem/80 hover:text-kem hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-kem/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-kem/55">
          © {new Date().getFullYear()} {site.name} — {site.domain}
        </p>
      </div>
    </footer>
  );
}
