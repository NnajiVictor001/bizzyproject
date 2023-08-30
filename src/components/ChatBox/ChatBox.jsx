import React from 'react';

import Button from 'components/Buttons/Button';

import closeIcon from 'img/close.png';
import styles from './ChatBox.module.scss';

function ChatBox(props) {
  const { chatState, setChatState, noTutorial } = props;
  const {
    main,
    chatBox,
    chatBoxClose,
    main__letChat,
    main__gotAQ,
    main__input,
    main__getBack,
    main__bottomRow,
    main__sideText,
    main__close,
    step2,
    step2Close,
    main__thankYou,
    main__midText,
    main__endText,
    main__close2
  } = styles;

  const onSubmit = () => {
    setChatState('step2');
  };

  const onClose = () => {
    setChatState('close');
  };

  return (
    <div className={main} style={{ visibility: chatState !== 'close' && 'visible' }}>
      <div className={chatState === 'step1' ? chatBox : chatBoxClose}>
        <img onClick={onClose} className={main__close} src={closeIcon} alt="Close Icon" />
        <p className={main__letChat}>Let Chat!</p>
        <p className={main__gotAQ}>Got a question or suggestion?</p>
        <textarea placeholder="Enter your questions here..." className={main__input} type="text" />
        <p className={main__getBack}>
          We’ll get back to you over email within 24-28 business hours.
        </p>
        <div className={main__bottomRow}>
          <Button onClick={onSubmit}>Submit</Button>
          {!noTutorial && (
            <p className={main__sideText}>
              Instead, take me to the <br />
              tutorial base.
            </p>
          )}
        </div>
      </div>
      <div className={chatState === 'step2' ? step2 : step2Close}>
        <img onClick={onClose} className={main__close2} src={closeIcon} alt="Close Icon" />
        <p className={main__thankYou}>
          Thank You! <br /> We’ll get back you soon!
        </p>
        <p className={main__midText}>
          We’ll get back to you over email within 24-28 business hours.
        </p>
        {!noTutorial && (
          <p className={main__endText}>
            Instead, take me to the
            <br />
            tutorial base.
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
