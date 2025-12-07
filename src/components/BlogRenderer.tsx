"use client";
import React from "react";
import parse from "html-react-parser";

interface BlogRendererProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: string | any; // Supports HTML string (Tiptap) or legacy JSON (if we add a parser later)
}

const BlogRenderer: React.FC<BlogRendererProps> = ({ data }) => {
    if (typeof data === 'string') {
        return <div className="prose dark:prose-invert max-w-none">{parse(data)}</div>;
    }

    // Fallback for legacy EditorJS data or empty
    return (
        <div className="prose dark:prose-invert max-w-none">
            <p className="text-red-500">Legacy content format not fully supported yet.</p>
            {/* If needed, we can implement a JSON -> HTML converter here for legacy posts */}
        </div>
    );
};

export default BlogRenderer;
