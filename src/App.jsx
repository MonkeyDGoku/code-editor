import { useState, useRef } from "react";
import "./App.css";
import Header from "./views/Header/Header";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function App() {
  const [count, setCount] = useState(0);
  const [editorCode, setEditorCode] = useState("");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  function handleEditorChange(value, event) {
    console.log(value);
    console.log(event);
  }

  return (
    <div className="App">
      <Header />
      {/* editor */}
      <div className="app__content">
        <div className="editor">
          <Editor
            className="monaco__editor"
            theme="vs-dark"
            height="100%"
            width="100%"
            defaultLanguage="markdown"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
          />
        </div>
        <div className="preview">{editorCode}</div>
      </div>

      {/* preview */}
    </div>
  );
}

export default App;
