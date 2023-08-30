import React from 'react';
import styles from './InputParagraph.module.scss';

function InputParagraph(props) {
  const { type, placeholder, id, value, onChange, name, className } = props;
  const { input_container, input, input__field, input__placeholder } = styles;

  const placeholderTxt = <span className={input__placeholder}>{placeholder}</span>;

  return (
    <div className={`${input_container} ${className}`}>
      <div className={input}>
        <textarea
          className={input__field}
          type={type}
          id={id}
          value={value || ''}
          onChange={onChange}
          name={name}
          required
        />
        {placeholderTxt}
      </div>
    </div>
  );
}

export default InputParagraph;
