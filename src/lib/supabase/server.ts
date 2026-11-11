import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Kết nối Supabase phía máy chủ (Server Components, Server Actions, Route Handlers).
// Next.js 16: cookies() bắt buộc phải await.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Gọi từ Server Component (không ghi được cookie) — proxy sẽ làm mới phiên đăng nhập.
          }
        },
      },
    },
  );
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
