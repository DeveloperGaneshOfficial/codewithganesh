"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), { ssr: false });

export default function WriteBlogPage() {
  const [blogEditorData, setBlogEditorData] = useState<any>(null);
  const handleBlogSave = (data: any) => {
    setBlogEditorData(data);
    // TODO: Save blog post to Supabase here
    // Example: supabase.from('blogs').insert([{ content: data }])
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Write a New Blog Post</h1>
      <BlogEditor onSave={handleBlogSave} />
      {blogEditorData && (
        <pre className="mt-4 p-2 bg-slate-100 dark:bg-slate-900 rounded text-xs overflow-x-auto">{JSON.stringify(blogEditorData, null, 2)}</pre>
      )}
    </div>
  );
}
