"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("পাসওয়ার্ড মিলছে না!");
    setLoading(true);

    const { error } = await signUp.email({ name, email, password });

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      setLoading(false);
    } else {
      toast.success("রেজিস্ট্রেশন সফল!");
      router.push("/");
      router.refresh();
    }
  };

  const social = (provider: "google" | "github") =>
    signIn.social({ provider, callbackURL: "/" });

  const field = "input input-bordered w-full bg-white";
  const label = "label-text font-medium text-gray-700";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-gray-500 text-sm mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <form onSubmit={handleSignUp} className="space-y-3">
          <label className="form-control">
            <span className={label}>নাম</span>
            <input
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              className={field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="form-control">
            <span className={label}>ইমেইল</span>
            <input
              type="email"
              placeholder="you@example.com"
              className={field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-control">
            <span className={label}>পাসওয়ার্ড</span>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className={field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </label>

          <label className="form-control">
            <span className={label}>পাসওয়ার্ড নিশ্চিত করুন</span>
            <input
              type="password"
              placeholder="আবার লিখুন"
              className={field}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              minLength={8}
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-success text-white w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        <div className="divider text-gray-400 text-xs my-4">অথবা</div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => social("google")} className="btn btn-outline btn-sm h-10 gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button onClick={() => social("github")} className="btn btn-outline btn-sm h-10 gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-600 font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mt-6">
        ← হোমে ফিরে যান
      </Link>
    </div>
  );
}