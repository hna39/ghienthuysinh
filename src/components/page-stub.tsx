import Link from "next/link";

// Khung tạm cho các trang đang xây dựng: hiện tiêu đề, mô tả và danh sách việc sẽ làm.
export function PageStub({
  eyebrow,
  title,
  description,
  todo,
  detail,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  todo: string[];
  detail?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      {eyebrow && <p className="text-xs font-semibold tracking-[0.18em] text-reu/60 uppercase">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{title}</h1>
      {detail && (
        <p className="mt-3 inline-block rounded-full bg-reu/5 px-3 py-1 font-mono text-xs text-reu/70">{detail}</p>
      )}
      <p className="mt-5 text-lg leading-relaxed text-reu/80">{description}</p>

      <div className="mt-10 rounded-2xl border border-dashed border-reu/25 bg-white/40 p-6">
        <p className="text-sm font-semibold">Đang xây dựng — trang này sẽ có:</p>
        <ul className="mt-3 space-y-2">
          {todo.map((t) => (
            <li key={t} className="flex gap-2 text-sm leading-relaxed text-reu/80">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-vang" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/" className="mt-10 inline-flex text-sm font-medium underline decoration-vang underline-offset-4">
        ← Về trang chủ
      </Link>
    </section>
  );
}
