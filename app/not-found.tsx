import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="font-display text-3xl font-semibold">This page is not available.</h1>
        <p className="mt-3 text-secondary">
          The requested route could not be found, but the label profile remains available at the home page.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-hover">
          Return home
        </Link>
      </div>
    </main>
  );
}
