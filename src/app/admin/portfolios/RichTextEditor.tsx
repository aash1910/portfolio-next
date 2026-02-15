'use client';

import { useEffect, useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import type { Editor } from '@tiptap/core';

type RichTextEditorProps = {
  name: string;
  value: string;
  onChange: (html: string) => void;
  idSuffix?: string;
  placeholder?: string;
};

function Toolbar({ editor, onToggleHtml }: { editor: Editor; onToggleHtml: () => void }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl || 'https://');
    if (url == null) return;
    if (url === '') editor.chain().focus().extendMarkRange('link').unsetLink().run();
    else editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-0.5 p-1 border border-gray-300 border-b-0 rounded-t bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded text-sm font-medium ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded text-sm ${editor.isActive('italic') ? 'bg-gray-200 italic' : 'hover:bg-gray-100'}`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded text-sm ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Bullet list"
      >
        •
      </button>
      <button
        type="button"
        onClick={setLink}
        className={`p-1.5 rounded text-sm ${editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Link"
      >
        🔗
      </button>
      <button
        type="button"
        onClick={onToggleHtml}
        className="p-1.5 rounded text-sm hover:bg-gray-100 font-mono text-xs"
        title="Edit HTML"
      >
        &lt;/&gt;
      </button>
    </div>
  );
}

export function RichTextEditor({ name, value, onChange, idSuffix, placeholder }: RichTextEditorProps) {
  const [htmlMode, setHtmlMode] = useState(false);

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener' } }),
      ],
      content: value || '',
      editorProps: {
        attributes: {
          class: 'min-h-[80px] px-3 py-2 border border-gray-300 rounded-b outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5',
        },
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    },
    []
  );

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const normalized = value || '';
    if (normalized !== current) {
      editor.commands.setContent(normalized, { emitUpdate: false });
    }
  }, [editor, value]);

  const inputId = idSuffix != null ? `${name}-${idSuffix}` : name;

  if (htmlMode) {
    return (
      <div>
        <input type="hidden" id={inputId} name={name} value={value} readOnly />
        <div className="flex items-center gap-0.5 p-1 border border-gray-300 border-b-0 rounded-t bg-gray-50">
          <button
            type="button"
            onClick={() => setHtmlMode(false)}
            className="p-1.5 rounded text-sm hover:bg-gray-100"
            title="Visual editor"
          >
            Visual
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[80px] w-full px-3 py-2 border border-gray-300 rounded-b outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 font-mono text-sm"
          placeholder="<p>HTML here...</p>"
          spellCheck={false}
        />
      </div>
    );
  }

  return (
    <div>
      <input type="hidden" id={inputId} name={name} value={value} readOnly />
      {editor ? <Toolbar editor={editor} onToggleHtml={() => setHtmlMode(true)} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
}
