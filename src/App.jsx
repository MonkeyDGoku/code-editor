import { useState, useRef } from "react";
import "./App.css";
// import Header from "./views/Header/Header";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { debounce } from "lodash";

///showdown
import Showdown from "showdown";

import "./views/Header/Header.css";

function App() {
  const DEFAULT_EDITOR_CODE = "// some code";
  const [count, setCount] = useState(0);
  const [editorCode, setEditorCode] = useState("");
  const editorRef = useRef(null);
  const [defaultValue, setDefaultvalue] = useState(DEFAULT_EDITOR_CODE);
  const mdHtml = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const debounce_handleEditorChange = debounce(handleEditorChange, 1000);

  function handleEditorChange(value, event) {
    const converter = new Showdown.Converter();
    const html = converter.makeHtml(value);
    setEditorCode(html);
  }

  function handleClear() {
    setDefaultvalue(DEFAULT_EDITOR_CODE);
    setEditorCode(null);
  }

  return (
    <div className="App">
      {/* header */}
      <header className="app__header">
        <nav>
          <button>Home</button>
          <button onClick={handleClear}>Clear All</button>
        </nav>
      </header>
      {/* editor */}
      <div className="app__content">
        <div className="editor">
          <Editor
            className="monaco__editor"
            theme="vs-dark"
            height="100%"
            width="100%"
            defaultLanguage="markdown"
            defaultValue={defaultValue}
            onMount={handleEditorDidMount}
            onChange={debounce_handleEditorChange}
          />
        </div>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: editorCode }}
        ></div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="app__header">
      <nav>
        <button>Home</button>
        <button>Clear All</button>
      </nav>
    </header>
  );
}

export default App;
