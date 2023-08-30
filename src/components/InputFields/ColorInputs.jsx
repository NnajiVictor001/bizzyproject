import React from 'react';
import Input from 'components/InputFields/Input';
import EyeIcon from 'img/eyeIcon.png';
import EditIcon from 'img/editIcon.png';
import styles from './ColorInputs.module.scss';

function ColorInputs(props) {
  const { hideEyeIcon, color, placeholderTxt } = props;

  const {
    colorInput,
    colorInput__inputContainer,
    colorInput__inputColor,
    colorInput__input,
    colorInput__eyeIcon,
    colorInput__inputWidth,
    colorInput__inputPlaceholder
  } = styles;
  return (
    <div className={colorInput}>
      <div className={colorInput__inputContainer}>
        {hideEyeIcon ? null : <img src={EyeIcon} className={colorInput__eyeIcon} alt="show/hide" />}
        <div style={{ backgroundColor: color }} className={colorInput__inputColor}>
          <img src={EditIcon} alt="edit" />
        </div>
        <div className={colorInput__inputWidth}>
          <Input
            placeholderClass={colorInput__inputPlaceholder}
            className={colorInput__input}
            loader
            placeholder={placeholderTxt}
          />
        </div>
      </div>
    </div>
  );
}

export default ColorInputs;
