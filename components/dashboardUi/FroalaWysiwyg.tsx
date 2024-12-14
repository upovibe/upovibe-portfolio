import React, { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// Import all Froala Editor plugins;
import "froala-editor/js/plugins.pkgd.min.js";

// Import a language file.
import "froala-editor/js/languages/de.js";

// Import a third-party plugin.
import "froala-editor/js/third_party/embedly.min.js";
import "froala-editor/js/third_party/spell_checker.min.js";

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
import "font-awesome/css/font-awesome.css";
import "froala-editor/js/third_party/font_awesome.min.js";

interface FroalaWysiwygProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const FroalaWysiwyg = ({ initialValue, onChange }: FroalaWysiwygProps) => {
  const [model, setModel] = useState(initialValue || localStorage.getItem("savedHtml") || "");

  return (
    <div>
      <FroalaEditor
        model={model}
        onModelChange={(e: string) => {
          setModel(e);
          onChange(e);
          localStorage.setItem("savedHtml", e);
        }}
        config={{
          placeholderText: "Start typing your content...",
          saveInterval: 500,
          events: {
            "save.before": function (html: string) {
              localStorage.setItem("savedHtml", html);
            }
          }
        }}
      />
    </div>
  );
};

export default FroalaWysiwyg;