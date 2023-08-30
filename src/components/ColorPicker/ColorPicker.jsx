import React from 'react';
import { CustomPicker } from 'react-color';
import { EditableInput, Hue, Saturation } from 'react-color/lib/components/common';
import pickerCircle from 'img/pickerCircle.png';
import eyeDrop from 'img/eyeDrop.png';
import styles from './ColorPicker.module.scss';

const inlineStyles = {
  pointer: {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    transform: 'translate(-0.8rem, -1rem)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
  },
  slider: {
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
    transform: 'translate(-0.4rem, -0.6rem)'
  }
};

function CustomPointer() {
  return (
    <div>
      <img style={inlineStyles.pointer} src={pickerCircle} alt="custom pointer" />
    </div>
  );
}

function CustomSlider() {
  return (
    <div>
      <img style={inlineStyles.slider} src={pickerCircle} alt="custom slider" />
    </div>
  );
}

export function MyPicker(props) {
  const { hex, hsl, hsv, onChange } = props;
  const { hue_container, saturation_container, swatch, edit_container } = styles;

  const custom_styles = {
    input: {
      height: 46,
      border: '1px solid #DFDFDF',
      borderRadius: 4,
      padding: '1.5rem 6rem 1.4rem 2.8rem',
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 18,
      color: '#757575',
      width: '100%'
    }
  };

  return (
    <div>
      <div className={saturation_container}>
        <Saturation pointer={CustomPointer} hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>

      <div className={hue_container}>
        <Hue pointer={CustomSlider} hsl={hsl} onChange={onChange} />
      </div>

      <div className={edit_container}>
        <EditableInput
          style={{ input: custom_styles.input }}
          value={`HEX ${hex}`}
          onChange={onChange}
        />
        <div className={swatch}>
          <img src={eyeDrop} alt="picker png" />
        </div>
      </div>
    </div>
  );
}

export default CustomPicker(MyPicker);
