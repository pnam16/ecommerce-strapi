/* eslint-disable */
import React from "react";
import { Label, Description, ErrorMessage } from "@buffetjs/styles";
import Editor from "../QuillEditor";
// import Editor from "../CKEditor";


const Wysiwyg = ({ inputDescription, error, label, name, onChange, value }) => {
  const hasError = Boolean(error);

  return (
    <div
      style={{
        marginBottom: "1.6rem",
        fontSize: "1.3rem",
      }}
    >
      <Label htmlFor={name} style={{ marginBottom: 10 }} >{label} </Label>

      <Editor name={name} onChange={onChange} value={value} />

      {!hasError && inputDescription && (
        <Description>{inputDescription}</Description>
      )}
      {hasError && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Wysiwyg;
