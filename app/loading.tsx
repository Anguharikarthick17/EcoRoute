/**
 * Root Loading State (app/loading.tsx)
 *
 * Renders an accessible, smooth loading indicator during page transitions
 * without blocking navigation or causing cumulative layout shift (CLS).
 */
export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 py-16"
      role="status"
      aria-label="Loading EcoRoute content"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm font-semibold text-slate-500 animate-pulse">
        Loading EcoRoute...
      </p>
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}
