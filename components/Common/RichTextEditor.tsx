import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the stylesheet

interface RichTextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const handleTextChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleTextChange}
      style={{ height: 100 }}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }, { background: [] }],
          ['link', 'image'],
        ],
      }}
      formats={[
        'header',
        'font',
        'list',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'color',
        'background',
        'link',
        'image',
      ]}
    />
  );
};

export default RichTextEditor;
