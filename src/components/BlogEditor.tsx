"use client";
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface BlogEditorProps {
  // onSave is no longer driven by onChange, but we can keep it if needed. 
  // For now, we'll rely on the ref.
  defaultValue?: OutputData;
}

export interface BlogEditorHandle {
  save: () => Promise<OutputData>;
}

const BlogEditor = forwardRef<BlogEditorHandle, BlogEditorProps>((props, ref) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holder = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    save: async () => {
      if (editorRef.current) {
        return await editorRef.current.save();
      }
      throw new Error("Editor not initialized");
    }
  }));

  useEffect(() => {
    if (!holder.current) return;

    // Prevent double initialization
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: holder.current,
      autofocus: true,
      placeholder: "Write your blog post...",
      data: props.defaultValue,
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
      // Removed onChange auto-save
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        // editor.destroy() is sometimes async or buggy in strict mode, but good practice
        // We can just nullify the ref to be safe
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div ref={holder} className="min-h-[300px] prose dark:prose-invert max-w-none focus:outline-none" />;
});

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
