import { NotFound404 } from "@/components/ui/NotFound404";

/**
 * not-found.tsx — Next.js App Router 404 handler.
 *
 * Rendered automatically when `notFound()` is called or
 * when no route matches.
 */
export default function NotFound() {
  return <NotFound404 />;
}
