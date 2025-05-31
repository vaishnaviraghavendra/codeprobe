import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";

function GreatestOf2() {
  const [editorContent, setEditorContent] = useState("");
  const [response, setResponse] = useState();

  const submitCode = (event) => {
    axios
      .post("http://localhost:3004/assess", {
        code: editorContent,
        inputFilepath: "./inputsFolder/GreatestOf2.txt",
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

  return (
    <React.Fragment>
       <h2 style={{ color: "black" }}>Solution:</h2>
      <h2 style={{ color: "black" }}>Write a function to find the greatest of 2 numbers</h2>
      <Editor
        className="editorContent"
        value={editorContent}
        height="50vh"
        theme="vs-dark"
        onChange={handleChange}
        defaultLanguage="javascript"
      />{" "}
      <br />
      <button style={{ backgroundColor: "black", color: "white" }} onClick={submitCode}>Run Code</button>
      <div style={{ color: "black" }}>{response}</div>
      <Link to="/">Back</Link>
    </React.Fragment>
  );
}

export default GreatestOf2;
