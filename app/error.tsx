"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
      <div className="p-8 rounded-3xl glass-nav border border-white/20 text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-sm text-slate-300 mb-6 font-light">
          An unexpected error occurred while rendering the page.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#0d6e7e] hover:bg-[#158ca0] text-white rounded-full font-semibold transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
