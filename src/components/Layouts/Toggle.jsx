import React from 'react';
import styles from './Toggle.module.scss';

function Toggle(props) {
  const { first, second, isToggled, onToggle, className, sliderClass, isMove } = props;
  const {
    flex,
    toggler,
    toggler__input,
    toggler__slider,
    leftLabel,
    rightLabel,
    activeLabel,
    inactiveLabel
  } = styles;

  const toggleHandler = () => {
    onToggle();
  };

  return (
    <div className={`${className} ${flex}`}>
      <span
        className={isToggled ? `${leftLabel} ${inactiveLabel}` : `${leftLabel} ${activeLabel}`}
        onClick={toggleHandler}>
        {first}
      </span>
      <label className={toggler}>
        <input
          className={toggler__input}
          type="checkbox"
          checked={isToggled}
          onChange={toggleHandler}
        />
        <span onClick={isMove && toggleHandler} className={`${sliderClass} ${toggler__slider}`} />
      </label>
      <span
        className={isToggled ? `${rightLabel} ${activeLabel}` : `${rightLabel} ${inactiveLabel}`}
        onClick={toggleHandler}>
        {second}
      </span>
    </div>
  );
}

export default Toggle;
