import React, { useCallback, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';
import { ITheme, mergeStyleSets } from '@uifabric/styling';

interface IProps {
  onClick?: object;
  children?: ReactNode;
  theme?: ITheme;
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
  const classNames = mergeStyleSets({
    dropzone: {
      height: 100,
      textAlign: 'center',
      verticalAlign: 'middle',
      margin: '0 5px 15px',
      backgroundColor: IProps.theme.palette.themeLighter,
      padding: 15,
      color: IProps.theme.palette.themeDark,
      selectors: {
        '& svg': {
          height: '50px !important',
          width: '150px !important',
        },
        '& svg path': {
          fill: IProps.theme.palette.themeDarkerAlt,
        },
      },
    },
  });

  return (
    <div
      className={classNames.dropzone}
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
