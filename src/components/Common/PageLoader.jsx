import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { FlexBox } from './Block';

const LoaderBlock = styled(FlexBox)`
  align-items: center;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  align-items: center;
  flex-direction: column;
  top: 0;
  width: 100%;
  z-index: 2000;
  gap: 2rem;
`;

function PageLoader(props) {
  const { text } = props;
  return (
    <LoaderBlock>
      <CircularProgress color="inherit" />
      {text ? <h3>{text}</h3> : null}
    </LoaderBlock>
  );
}

export default PageLoader;
