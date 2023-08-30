import React, { useMemo } from 'react';
import styles from './InputCheckboxImage.module.scss';

function InputCheckboxImage(props) {
  const {
    customCheckbox,
    customCheckbox__input,
    customCheckbox__checkMark,
    bottom_con,
    bottom_con__check_img,
    bottom_con__uncheck_img
  } = styles;
  const { id, label, onChange, checked, className, readOnly, attachedImage } = props;

  const disabled = useMemo(() => {
    if (['tipspage', 'journalpage'].includes(id)) {
      return true;
    }
    return false;
  }, [id]);

  return (
    <div>
      <div>
        <label style={{ opacity: disabled ? 0.5 : 1 }} htmlFor={id} className={customCheckbox}>
          {label}
          <input
            className={customCheckbox__input}
            type="checkbox"
            id={id}
            onChange={!disabled ? onChange : undefined}
            checked={checked}
            readOnly={!!readOnly}
            required
            disabled={disabled}
          />
          <span className={`${className} ${customCheckbox__checkMark}`} />
        </label>
      </div>
      <div className={bottom_con}>
        <img
          style={{ opacity: disabled ? 0.5 : 1 }}
          src={attachedImage}
          alt="about me"
          className={checked ? bottom_con__check_img : bottom_con__uncheck_img}
        />
        {disabled && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5>Coming Soon...</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputCheckboxImage;
