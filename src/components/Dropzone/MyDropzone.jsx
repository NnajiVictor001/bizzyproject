import React from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './MyDropzone.module.scss';

function MyDropzone(props) {
  const { id, disabled, callback } = props;

  const { dropzone, disable_dropzone } = styles;

  const onDrop = (files) => {
    callback(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled
  });

  return (
    <div className={`${dropzone} ${disabled && disable_dropzone}`} {...getRootProps()}>
      <input id={id} {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>
          Drag the file here or <a>choose file</a>
        </p>
      )}
    </div>
  );
}

export default MyDropzone;
