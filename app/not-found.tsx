import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
      <div className="p-8 rounded-3xl glass-nav border border-white/20 text-center max-w-md">
        <h2 className="text-4xl font-bold mb-2 text-teal-300">404</h2>
        <h3 className="text-xl font-semibold mb-4">Page Not Found</h3>
        <p className="text-sm text-slate-300 mb-6 font-light">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#0d6e7e] hover:bg-[#158ca0] text-white rounded-full font-semibold transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
