"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut, updateUser } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  const user = session?.user;
  if (!user) {
    router.push("/signin?callbackURL=/profile");
    return null;
  }

  const handleSignOut = () =>
    signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
          router.refresh();
        },
      },
    });

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name")).trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না!");

    setSaving(true);
    const { error } = await updateUser({ name });

    if (error) {
      setSaving(false);
      console.error("updateUser error:", error);
      return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে!");
    }

    await refetch();
    setSaving(false);
    toast.success("প্রোফাইল আপডেট হয়েছে!");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
      <p className="text-gray-500 text-sm mt-1 mb-5">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      {/* Profile card */}
      <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="w-14 h-14 rounded-lg object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-green-600 text-white flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">{user.name}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>

        <button
          onClick={handleSignOut}
          className="btn btn-sm btn-outline btn-error"
        >
          সাইন আউট
        </button>
      </div>

      {/* Info form */}
      <div className="bg-white border rounded-xl p-5 mt-4">
        <h2 className="font-semibold text-gray-800 mb-3">তথ্য</h2>

        <form onSubmit={handleUpdate} className="space-y-3" key={user.name}>
          <label className="form-control">
            <span className="label-text font-medium text-gray-700">নাম</span>
            <input
              name="name"
              type="text"
              defaultValue={user.name}
              className="input input-bordered w-full bg-white"
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-success text-white w-full"
            disabled={saving}
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "আপডেট"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}