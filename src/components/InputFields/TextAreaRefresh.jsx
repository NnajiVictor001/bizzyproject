import React, { useState } from 'react';
import refreshIcon from 'img/refresh.svg';
import styles from './TextAreaRefresh.module.scss';

function TextAreaRefresh(props) {
  const {
    container__refresh,
    container__placeholder,
    container__inputs,
    container_refresh,
    input,
    container
  } = styles;
  const { text, label, refreshClick, onInput, name, className, refresh = true } = props;

  const [inputTexts, setInputTexts] = useState({
    topText: text?.split('{}')[0] ?? '',
    bottomText: text?.split('{}')[1] ?? ''
  });

  const handleTextChange = (inp, value) => {
    onInput({
      ...inputTexts,
      [inp]: value
    });
    setInputTexts((prev) => ({
      ...prev,
      [inp]: value
    }));
  };

  return (
    <div className={`${className} ${container}`} name={name}>
      <div className={container__inputs}>
        <textarea
          className={input}
          value={text?.split('{}')[0] ?? ''}
          onChange={(e) => handleTextChange('topText', e.target.value)}
          style={{
            fontWeight: 'bold'
          }}
        />
        <textarea
          value={text?.split('{}')[1] ?? ''}
          onChange={(e) => handleTextChange('bottomText', e.target.value)}
          className={input}
        />
      </div>

      <span className={container__placeholder} contentEditable={false}>
        {label}
      </span>
      {refresh && (
        <div className={container_refresh}>
          <img
            src={refreshIcon}
            className={container__refresh}
            alt="refresh"
            onClick={refreshClick}
          />
        </div>
      )}
    </div>
  );
}

export default TextAreaRefresh;
