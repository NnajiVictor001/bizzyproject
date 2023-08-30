import { BlockBox } from 'components/Common/Block';
import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  color: ${(props) => props.color};
`;

const ColoredSpan = styled.span`
  color: ${(props) => props.color};
`;

const ColoredSubText = ({ id, text, subText, className, baseColor, color }) => {
  const exists = text?.includes(subText);

  if (!exists)
    return (
      <BlockBox id={id}>
        <Heading color={baseColor} className={className}>
          {text}
        </Heading>
      </BlockBox>
    );

  const beforeColoredText = text.split(subText)[0];
  const afterColoredText = text.split(subText)[1];

  return (
    <BlockBox id={id}>
      <Heading color={baseColor} className={className}>
        {beforeColoredText}
        <ColoredSpan color={color}>{subText}</ColoredSpan>
        {afterColoredText}
      </Heading>
    </BlockBox>
  );
};

export default ColoredSubText;
