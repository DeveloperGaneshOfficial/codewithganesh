"use client";
import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";

interface BlogEditorProps {
  onSave: (data: any) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holder = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!holder.current) return;
    const editor = new EditorJS({
      holder: holder.current,
      autofocus: true,
      placeholder: "Write your blog post...",
      onReady: () => {},
      onChange: async () => {
        if (editorRef.current) {
          const data = await editorRef.current.save();
          onSave(data);
        }
      },
      tools: {
        header: require('@editorjs/header'),
        list: require('@editorjs/list'),
        image: require('@editorjs/image'),
        quote: require('@editorjs/quote'),
        paragraph: require('@editorjs/paragraph'),
        linkTool: require('@editorjs/link'),
        code: require('@editorjs/code'),
        marker: require('@editorjs/marker'),
        table: require('@editorjs/table'),
        warning: require('@editorjs/warning'),
        delimiter: require('@editorjs/delimiter'),
        raw: require('@editorjs/raw'),
        embed: require('@editorjs/embed'),
      },
    });
    editorRef.current = editor;
    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
      }
      editorRef.current = null;
    };
  }, [onSave]);

  return <div ref={holder} className="border rounded-lg min-h-[300px] bg-white dark:bg-slate-800 p-4" />;
};

export default BlogEditor;
