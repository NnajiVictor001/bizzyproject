import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import NavButton from 'components/Buttons/NavButton';

import styles from './InputPasscode.module.scss';

function InputPasscode() {
  const { passcode, passcode__input, passcode__Btns } = styles;
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const navigate = useNavigate();

  const input1Handler = (evt) => {
    if (evt.target.value) input2Ref.current.focus();
  };
  const input2Handler = (evt) => {
    if (evt.target.value) input3Ref.current.focus();
  };
  const input3Handler = (evt) => {
    if (evt.target.value) input4Ref.current.focus();
  };
  const input4Handler = (evt) => {
    if (evt.target.value) input4Ref.current.blur();
  };
  const previousPage = () => {
    navigate('/forgot-password');
  };
  const submitForm = (evt) => {
    evt.preventDefault();
    const passCode = {
      first: +input1Ref.current.value,
      second: +input2Ref.current.value,
      third: +input3Ref.current.value,
      fourth: +input4Ref.current.value
    };
    console.log(passCode);
    input1Ref.current.value = '';
    input2Ref.current.value = '';
    input3Ref.current.value = '';
    input4Ref.current.value = '';
    navigate('/forgot-password-change');
  };

  return (
    <form onSubmit={submitForm}>
      <div className={passcode}>
        <input
          type="tel"
          ref={input1Ref}
          maxLength={1}
          className={passcode__input}
          onChange={input1Handler}
        />
        <input
          type="tel"
          ref={input2Ref}
          maxLength={1}
          className={passcode__input}
          onChange={input2Handler}
        />
        <input
          type="tel"
          ref={input3Ref}
          maxLength={1}
          className={passcode__input}
          onChange={input3Handler}
        />
        <input
          type="tel"
          ref={input4Ref}
          maxLength={1}
          className={passcode__input}
          onChange={input4Handler}
        />
      </div>
      <div className={passcode__Btns}>
        <NavButton type="button" txt="< &nbsp;Back" bgColor="#ffffff" onClick={previousPage} />
        <NavButton type="submit" bgColor="#ffc800" txt="Next&nbsp; >" />
      </div>
    </form>
  );
}

export default InputPasscode;
