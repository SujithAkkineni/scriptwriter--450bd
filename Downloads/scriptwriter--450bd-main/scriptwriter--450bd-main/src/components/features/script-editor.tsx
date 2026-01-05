'use client';

import { useContext, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FontContext } from '@/context/font-context';

interface ScriptEditorProps {
  value: string;
  onChange: (value: string) => void;
  characters: string[];
  scenes: string[];
  cursorPosition?: {start: number, end: number} | null;
}

export default function ScriptEditor({ value, onChange, characters, scenes, cursorPosition }: ScriptEditorProps) {
  const { font } = useContext(FontContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getMonoFontClass = () => {
    switch (font) {
      case 'font-courier-prime':
        return 'font-courier-prime';
      case 'font-courier-new':
        return 'font-courier-new';
      default:
        return 'font-mono';
    }
  };

  useEffect(() => {
    if (cursorPosition != null && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = cursorPosition.start;
      textareaRef.current.selectionEnd = cursorPosition.end;
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [cursorPosition]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const textarea = e.target as HTMLTextAreaElement;
      const cursorPosition = textarea.selectionStart;
      const lines = value.split('\n');
      const currentLineIndex = value.substring(0, cursorPosition).split('\n').length - 1;
      const currentLine = lines[currentLineIndex].trim();
      const upperCurrent = currentLine.toUpperCase();

      if (characters.includes(upperCurrent) && !lines[currentLineIndex].includes(':')) {
        // Format the current line
        lines[currentLineIndex] = upperCurrent + ': ';
        const newValue = lines.join('\n');
        onChange(newValue);
        // Set cursor after the ': '
        setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPos = newValue.length;
            textareaRef.current.selectionStart = newCursorPos;
            textareaRef.current.selectionEnd = newCursorPos;
          }
        }, 0);
        e.preventDefault();
      } else if (scenes.includes(upperCurrent)) {
        // Format the current line to uppercase
        lines[currentLineIndex] = upperCurrent;
        const newValue = lines.join('\n') + '\n';
        onChange(newValue);
        // Set cursor at the beginning of the new line
        setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPos = newValue.length;
            textareaRef.current.selectionStart = newCursorPos;
            textareaRef.current.selectionEnd = newCursorPos;
          }
        }, 0);
        e.preventDefault();
      }
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl shadow-lg bg-card">
        <CardContent className="p-1 md:p-2">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="[SCENE START]..."
            className={`min-h-[calc(100vh-12rem)] w-full resize-none border-0 bg-transparent p-4 text-[12pt] leading-relaxed focus-visible:ring-0 md:p-8 ${getMonoFontClass()}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
