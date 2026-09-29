"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none focus:border-teal-500/70 focus:ring-2 focus:ring-teal-500/20 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-teal-500/60 via-white/10 to-amber-500/50 shadow-2xl">
          <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl px-8 py-10">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-[#074853] flex items-center justify-center shadow-lg shadow-teal-900/50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-400 mt-1">Mahatab Properties Ltd.</p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
                  Username
                </label>
                <input
                  className={inputClass}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}