import { FlexBox } from 'components/Common/Block';
import { COLOR_WHITE, COLOR_LIGHT_GRAY, COLOR_BOLD_GRAY, COLOR_BLUE } from 'constants/Colors';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background: ${COLOR_WHITE};
  border: 1px dashed ${COLOR_LIGHT_GRAY};
  border-radius: 1rem;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2rem;
  align-items: center;
  text-align: center;
  color: ${COLOR_BOLD_GRAY};
  width: fit-content;
  gap: 30px;

  a {
    color: ${COLOR_BLUE};
    text-decoration: underline;
    cursor: pointer;
  }

  opacity: ${(props) => props.disabled && 0.6};
`;

const Paragraph = styled.p`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

function DropZone(props) {
  const { id, disabled, onUpload, onDelete } = props;
  const [file, setFile] = useState();

  const onDrop = (files) => {
    setFile(files[0]);
    onUpload(files[0]);
  };

  const handleDelete = () => {
    setFile(null);
    onDelete();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled
  });

  return (
    <DropBox disabled={disabled}>
      <FlexBox {...getRootProps()}>
        <input id={id} {...getInputProps()} />
        {file ? (
          <FlexBox>
            <p>{file.name}</p>
          </FlexBox>
        ) : (
          <p>
            Drag the file here or <a>choose file</a>
          </p>
        )}
      </FlexBox>
      <FlexBox>
        {file && (
          <FlexBox>
            <FlexBox {...getRootProps()}>
              <Paragraph>Replace</Paragraph>
            </FlexBox>
            {onDelete && '/'}
            {onDelete && <Paragraph onClick={() => handleDelete()}>Delete</Paragraph>}
          </FlexBox>
        )}
      </FlexBox>
    </DropBox>
  );
}

export default DropZone;
