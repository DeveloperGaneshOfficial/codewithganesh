"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name: string; mobile: string; avatar_url: string }>(
    { name: "", mobile: "", avatar_url: "" }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      setUser(user);
      const { data, error } = await supabase
        .from("profiles")
        .select("name, mobile, avatar_url")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ name: profile.name, mobile: profile.mobile })
      .eq("id", user.id);
    if (error) setError(error.message);
    else setSuccess("Profile updated successfully!");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}.${fileExt}`;
    let { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const avatar_url = data.publicUrl;
    setProfile((p) => ({ ...p, avatar_url }));
    await supabase.from("profiles").update({ avatar_url }).eq("id", user.id);
    setSuccess("Profile picture updated!");
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-theme">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Update Profile
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-slate-400">👤</span>
              )}
            </div>
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              Change Profile Picture
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              pattern="[0-9]{10}"
              maxLength={10}
              value={profile.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-theme shadow-md hover:shadow-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
