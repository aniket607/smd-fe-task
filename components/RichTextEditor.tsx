'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon, 
  List, 
  ListOrderedIcon 
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuButton = ({ 
  isActive, 
  onClick, 
  children 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-100 ${
      isActive ? 'bg-gray-200' : ''
    }`}
  >
    {children}
  </button>
);

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <MenuButton
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="w-5 h-5" />
        </MenuButton>
        
        <MenuButton
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="w-5 h-5" />
        </MenuButton>
        
        <MenuButton
          isActive={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-5 h-5" />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <MenuButton
          isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-5 h-5" />
        </MenuButton>
        
        <MenuButton
          isActive={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon className="w-5 h-5" />
        </MenuButton>
      </div>
      
      <div className="prose prose-sm max-w-none relative">
        <EditorContent 
          editor={editor} 
          className="w-full p-3 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ring-0 [&_.ProseMirror]:min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
