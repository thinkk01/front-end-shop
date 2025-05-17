import React from "react";
import { useDropzone } from "react-dropzone";

type TProps = {
    children: React.ReactNode,
    uploadFunction: (file: File) => void,
    objectAcceptFile?: Record<string, string[]>
}
const WrapFileUpload = (props: TProps) => {
    const { children, uploadFunction, objectAcceptFile } = props;
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: objectAcceptFile ?? {},
        onDrop: (file) => {
            uploadFunction(file[0]);
        },
    }
);

  return (
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {children}
      </div>  
  );
};

export default WrapFileUpload;