/* eslint-disable */
import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const Editor = ({onChange, name, value}) => {
  const modules = {
    toolbar: [
      [{header: [2, 3, 4, false]}],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{align: ""}, {align: "center"}, {align: "right"}, { align: "justify" }],
      [{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
      ["link", "video"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      modules={modules}
      onChange={(content, event, editor) => {
        onChange({target: {name, value: content}});
      }}
    />
  );
};

export default Editor;
