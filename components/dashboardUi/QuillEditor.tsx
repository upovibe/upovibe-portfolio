import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [html, setHtml] = useState(initialValue);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Enter content...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        const newHtml = quillRef.current?.querySelector(".ql-editor")?.innerHTML || "";
        setHtml(newHtml);
      });
    }
  }, []);

  useEffect(() => {
    onChange(html);
  }, [html, onChange]);

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = initialValue || "";
    }
  }, [initialValue]);

  return <div ref={quillRef} />;
};

export default QuillEditor;