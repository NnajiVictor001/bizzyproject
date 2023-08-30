import React from 'react';
import styles from './PaletteExample.module.scss';

function PaletteExample(props) {
  const {
    container_outer,
    container,
    container__inner,
    container__inner__left,
    container__inner__right,
    example_txt
  } = styles;

  const { colors } = props;

  const tempArrays = [...colors];
  tempArrays.sort(() => Math.random() - 0.5);

  return (
    <div className={container_outer}>
      <div className={container}>
        <div className={container__inner}>
          <div
            className={container__inner__left}
            style={{ backgroundColor: tempArrays[0].value }}
          />
          <div
            className={container__inner__right}
            style={{ backgroundColor: tempArrays[1].value }}
          />
        </div>
        <div className={container__inner}>
          <div
            className={container__inner__right}
            style={{ backgroundColor: tempArrays[2].value }}
          />
          <div
            className={container__inner__right}
            style={{ backgroundColor: tempArrays[3].value }}
          />
          <div
            className={container__inner__right}
            style={{ backgroundColor: tempArrays[4].value }}
          />
        </div>
      </div>
      <p className={example_txt}>Example</p>
    </div>
  );
}

export default PaletteExample;
