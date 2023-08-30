import React from 'react';

import styles from './EmailSignupForm.module.scss';

function EmailSignupForm(props) {
  const { className, placeholder, btnText, onClick, onChange, value } = props;
  const { main, main__input, main__btn } = styles;
  return (
    <form onSubmit={onClick} className={`${main} ${className}`}>
      <input
        onChange={onChange}
        value={value}
        className={main__input}
        placeholder={placeholder}
        type="email"
      />
      <button className={main__btn} type="submit">
        {btnText}
      </button>
    </form>
  );
}

export default EmailSignupForm;
