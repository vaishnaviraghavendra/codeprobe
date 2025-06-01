import React from "react";
import axios from "axios";
import { useState } from "react";
import Editor from "@monaco-editor/react";

function Greatest() {
  const [editorContent, setEditorContent] = useState("");
  const [response, setResponse] = useState();

  const submitCode = (event) => {
    axios
      .post("http://localhost:3005/assess", {
        code: editorContent,
        probID: "2",
      })
      .then(function (response) {
        setResponse(response.data);
      })
      .catch(function (error) {
        setResponse(error?.response?.data?.msg);
      });
  };
  const handleChange = (value, event) => {
    setEditorContent(value);
  };
  let placeholder = `function greater(a,b) {
    // write code from here

}

greater(a,b);`;
  return (
    <React.Fragment>
      <h2 style={{ color: "black" }}>Solution:</h2>
      <h2 style={{ color: "black" }}>Write a function to find the greater of 2 numbers</h2>
      <Editor
        className="editorContent"
        value={editorContent}
        height="50vh"
        theme="vs-dark"
        onChange={handleChange}
        defaultLanguage="javascript"
        defaultValue={placeholder}
      />{" "}
      <br />
      <button style={{ backgroundColor: "black", color: "white" }} onClick={submitCode}>Run Code</button>
      <div style={{ color: "black" }}>{response}</div>
    </React.Fragment>
  );
}

export default Greatest;