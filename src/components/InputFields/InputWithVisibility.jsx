import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import InputRefresh from 'components/InputFields/InputRefresh';

import styles from './InputWithVisibility.module.scss';

function InputWithVisibility(props) {
  const { flex, flex__img, flex__input } = styles;
  const {
    type,
    id,
    showInput,
    toggleInputVisibility,
    value,
    pickerBgColor,
    onChange,
    placeholder,
    changeColorHandler,
    name,
    clickHandler,
    refresh,
    visibilityFunctionality = true
  } = props;

  return (
    <div className={flex}>
      {visibilityFunctionality ? (
        showInput ? (
          <VisibilityOutlinedIcon
            fontSize="large"
            onClick={toggleInputVisibility}
            className={flex__img}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            fontSize="large"
            onClick={toggleInputVisibility}
            className={flex__img}
          />
        )
      ) : (
        ''
      )}
      <InputRefresh
        type={type}
        id={id}
        value={value}
        pickerBgColor={pickerBgColor}
        onChange={onChange}
        placeholder={placeholder}
        changeColorHandler={changeColorHandler}
        className={flex__input}
        name={name}
        refresh={refresh}
        clickR={clickHandler}
      />
    </div>
  );
}

export default InputWithVisibility;
