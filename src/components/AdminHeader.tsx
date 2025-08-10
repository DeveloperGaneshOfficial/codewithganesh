"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { supabase } from "@/utils/supabase/client";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-tech-dark/90 backdrop-blur-md shadow-sm dark:shadow-slate-900/30 transition-theme">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
              <span className="font-mono">A</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">Admin Panel</span>
            </div>
          </Link>

          {/* Admin Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/admin/videos" className={`nav-link font-medium transition-theme ${pathname.startsWith("/admin/videos") ? "text-primary" : "text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary"}`}>Add Video</Link>
            <Link href="/admin/write-blog" className={`nav-link font-medium transition-theme ${pathname.startsWith("/admin/write-blog") ? "text-primary" : "text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary"}`}>Write Blog</Link>
            <Link href="/" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium">Back to Site</Link>
            <DarkModeToggle />
            <button onClick={handleLogout} className="nav-link text-red-600 hover:text-red-800 font-medium ml-2">Logout</button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-theme">
            <span className="material-icons">menu</span>
          </button>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4 pt-2 pb-3">
              <Link href="/admin/videos" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Add Video</Link>
              <Link href="/admin/write-blog" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Write Blog</Link>
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Back to Site</Link>
              <DarkModeToggle />
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-600 hover:text-red-800 font-medium text-left">Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
