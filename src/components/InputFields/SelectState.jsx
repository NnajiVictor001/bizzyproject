import React from 'react';
import styles from './SelectState.module.scss';

function SelectState(props) {
  const { options, placeholder, value, defaultValue, className, id, handleSelectedItem } = props;
  const { floatingLabelSelect } = styles;

  const handleInput = (evt) => {
    handleSelectedItem(evt.target.value);
  };

  const optionEls = [
    <option value="Default" key="Default">
      {placeholder}
    </option>
  ];
  const restOptions = options.map((opt) => (
    <option
      value={opt.name}
      key={opt.name}
      selected={value === opt.name || value === opt.abbreviation}>
      {opt.name}
    </option>
  ));
  optionEls.push(...restOptions);

  return (
    <div className={`${floatingLabelSelect} ${className}`}>
      <select id={id} defaultValue={defaultValue} onChange={handleInput}>
        {optionEls}
      </select>
    </div>
  );
}

export default SelectState;
