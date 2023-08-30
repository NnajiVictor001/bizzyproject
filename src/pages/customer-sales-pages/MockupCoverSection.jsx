import React, { useMemo } from 'react';
import styles from './MockupCoverSection.module.scss';

function MockupCoverSection(props) {
  const { cover_image, card } = styles;
  const { coverImage, mockupImage, mockupId, width, height, containerClassName, containerStyle } =
    props;

  const coverImageStyle = useMemo(() => {
    if (mockupId === 1) {
      // Tablet
      return {
        left: '66%',
        top: '50%',
        width: '61%'
      };
    }
    if (mockupId === 2) {
      // Notepad
      return {
        left: '57%',
        top: '49%',
        width: '72%',
        height: '89%'
      };
    }
    // Board
    return {
      left: '51%',
      top: '49%',
      width: '82%',
      height: '87%'
    };
  }, [mockupId]);

  return (
    <div
      className={`${card} ${containerClassName}`}
      style={{
        width,
        height,
        ...containerStyle
      }}>
      <img
        style={{
          width: '100%',
          height: '100%'
        }}
        src={mockupImage}
        alt="mockup"
      />
      <img className={cover_image} style={coverImageStyle} src={coverImage} alt="cover" />
    </div>
  );
}

export default MockupCoverSection;
