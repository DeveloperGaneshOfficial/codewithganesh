"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const initialVideos = [
	{ id: 1, title: "Getting Started with React", views: 15000, date: "2 weeks ago" },
	{ id: 2, title: "Mastering JavaScript", views: 12000, date: "1 month ago" },
	{ id: 3, title: "Intro to Python", views: 9000, date: "3 weeks ago" }
];
const initialBlogPosts = [
	{ id: 1, title: "React vs Vue: Which to Choose?", views: 567, date: "1 week ago" },
	{ id: 2, title: "10 JavaScript Tricks", views: 320, date: "2 weeks ago" }
];
const initialSubscribers = [
	{ id: 1, email: 'user1@example.com', date: '2025-06-01' },
	{ id: 2, email: 'user2@example.com', date: '2025-06-10' }
];
const initialUsers = [
	{ id: 1, name: 'Admin', email: 'admin@codewithganesh.com', role: 'admin' },
	{ id: 2, name: 'John Doe', email: 'john@example.com', role: 'user' }
];
const visitors = 2345;

const sections = [
	{ key: 'overview', label: 'Overview' },
	{ key: 'videos', label: 'Videos' },
	{ key: 'blog', label: 'Blog Posts' },
	{ key: 'write-blog', label: 'Write Blog' }, // New menu link
	{ key: 'subscribers', label: 'Newsletter Subscribers' },
	{ key: 'users', label: 'Users' },
];

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), { ssr: false });

export default function AdminDashboard() {
	const router = useRouter();
	const [authChecked, setAuthChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [theme, setTheme] = useState(
		typeof window !== 'undefined' && localStorage.getItem('theme')
			? localStorage.getItem('theme')
			: (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
	);
	const [section, setSection] = useState('overview');
	const [videos, setVideos] = useState(initialVideos);
	const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
	const [subscribers, setSubscribers] = useState(initialSubscribers);
	const [users, setUsers] = useState(initialUsers);
	// Blog editor state
	const [blogEditorData, setBlogEditorData] = useState<any>(null);

	useEffect(() => {
		const checkAuth = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) {
				router.replace("/login");
				return;
			}
			// Fetch user profile and check role
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('role')
				.eq('id', user.id)
				.single();
			if (profileError || !profile || profile.role !== 'admin') {
				router.replace("/login");
				return;
			}
			setIsAdmin(true);
			setAuthChecked(true);
		};
		checkAuth();
	}, [router]);

	// Theme toggle
	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', newTheme);
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
		}
	};
	// Set theme on mount
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	}, [theme]);

	// Stats
	const stats = [
		{ label: 'Video Views', value: videos.reduce((a, v) => a + v.views, 0) },
		{ label: 'Blog Post Views', value: blogPosts.reduce((a, b) => a + b.views, 0) },
		{ label: 'Visitor Count', value: visitors },
	];

	// Delete handlers
	const deleteVideo = (id: number) => setVideos(videos.filter(v => v.id !== id));
	const deleteBlog = (id: number) => setBlogPosts(blogPosts.filter(b => b.id !== id));
	const deleteSubscriber = (id: number) => setSubscribers(subscribers.filter(s => s.id !== id));
	const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));
	const handleBlogSave = (data: any) => {
		setBlogEditorData(data);
		// TODO: Save blog post to Supabase here
		// Example: supabase.from('blogs').insert([{ content: data }])
	};

	// Section content
	let sectionContent = null;
	if (section === 'videos') {
		sectionContent = (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{videos.map(video => (
					<div key={video.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700 transition-theme flex flex-col justify-between min-h-[160px]">
						<div>
							<div className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-2">{video.title}</div>
							<div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Views: {video.views.toLocaleString()} | {video.date}</div>
						</div>
						<button onClick={() => deleteVideo(video.id)} className="text-red-600 hover:underline mt-4 self-end">Delete</button>
					</div>
				))}
			</div>
		);
	} else if (section === 'blog') {
		sectionContent = (
			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{blogPosts.map(post => (
						<div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700 transition-theme flex flex-col justify-between min-h-[160px]">
							<div>
								<div className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-2">{post.title}</div>
								<div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Views: {post.views.toLocaleString()} | {post.date}</div>
							</div>
							<button onClick={() => deleteBlog(post.id)} className="text-red-600 hover:underline mt-4 self-end">Delete</button>
						</div>
					))}
				</div>
			</div>
		);
	} else if (section === 'write-blog') {
		// Route to /admin/write-blog page
		if (typeof window !== 'undefined') {
			window.location.href = '/admin/write-blog';
		}
		sectionContent = <div className="text-center py-10">Redirecting to blog editor...</div>;
	} else if (section === 'subscribers') {
		sectionContent = (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{subscribers.map(sub => (
					<div key={sub.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700 transition-theme flex flex-col justify-between min-h-[120px]">
						<div>
							<div className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-2">{sub.email}</div>
							<div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Subscribed: {sub.date}</div>
						</div>
						<button onClick={() => deleteSubscriber(sub.id)} className="text-red-600 hover:underline mt-4 self-end">Delete</button>
					</div>
				))}
			</div>
		);
	} else if (section === 'users') {
		sectionContent = (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{users.map(user => (
					<div key={user.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700 transition-theme flex flex-col justify-between min-h-[120px]">
						<div>
							<div className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-2">{user.name}</div>
							<div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{user.email} | Role: {user.role}</div>
						</div>
						<button onClick={() => deleteUser(user.id)} className="text-red-600 hover:underline mt-4 self-end">Delete</button>
					</div>
				))}
			</div>
		);
	}

	if (!authChecked) {
		return <div className="min-h-screen flex items-center justify-center text-lg">Checking authentication...</div>;
	}
	if (!isAdmin) {
		return null;
	}

	return (
		<div className="font-inter antialiased bg-white text-slate-800 dark:bg-tech-dark dark:text-slate-200 transition-theme min-h-screen flex flex-col">
			{/* Dashboard Content */}
			<main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
				<div className="absolute inset-0 blueprint-pattern pointer-events-none -z-10"></div>
				<div className="flex flex-col md:flex-row gap-8 relative z-10">
					{/* Sidebar */}
					<aside className="w-full md:w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8 md:mb-0 transition-theme border border-slate-100 dark:border-slate-700">
						<h2 className="text-xl font-bold mb-6 dark:text-white">Admin Dashboard</h2>
						<nav className="space-y-2">
							{sections.map(s => (
								<button
									key={s.key}
									className={`block w-full text-left px-4 py-2 rounded-lg font-medium sidebar-link transition-theme ${section === s.key ? 'bg-primary text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
									onClick={() => setSection(s.key)}
								>
									{s.label}
								</button>
							))}
						</nav>
					</aside>
					{/* Main Dashboard Area */}
					<div className="flex-1">
						<h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Dashboard Overview</h1>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
							{stats.map(stat => (
								<div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-theme border border-slate-100 dark:border-slate-700 text-center">
									<h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">{stat.label}</h2>
									<p className="text-3xl font-bold text-primary">{stat.value.toLocaleString()}</p>
								</div>
							))}
						</div>
						{/* Section Content */}
						<div className="mt-10">{sectionContent}</div>
					</div>
				</div>
			</main>
			
			<style jsx global>{`
				.transition-theme {
					transition: background-color 0.3s ease, color 0.3s ease;
				}
				.blueprint-pattern {
					background-color: rgba(255, 255, 255, 0.97);
					background-image:
						linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
						linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
					background-size: 20px 20px;
					background-position: -1px -1px;
				}
				.dark .blueprint-pattern {
					background-color: rgba(15, 23, 42, 0.97);
					background-image:
						linear-gradient(rgba(59, 130, 246, 0.07) 1px, transparent 1px),
						linear-gradient(90deg, rgba(59, 130, 246, 0.07) 1px, transparent 1px);
				}
			`}</style>
		</div>
	);
}
