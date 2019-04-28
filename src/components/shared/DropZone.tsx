import React, { useCallback, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  onClick?: object;
  children?: ReactNode;
}

export const Dropzone = IProps => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={'dropzone'}
      {...getRootProps({
        onClick: event => console.log(event),
      })}
    >
      <input {...getInputProps()} />
      {IProps.children}
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};
