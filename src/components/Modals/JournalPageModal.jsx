import React, { useEffect, useRef } from 'react';

import closeMark from 'img/close.svg';
import NavButton from 'components/Buttons/NavButton';
import journalImg1 from 'img/journal_image1.png';
import journalImg2 from 'img/journal_image2.png';
import journalImg3 from 'img/journal_image3.png';
import JournalPart from 'components/Products/JournalPart';
import styles from './JournalPageModal.module.scss';

const data = [
  {
    id: 0,
    imageSrc: journalImg1,
    checkTitle: 'Letter To Self',
    checkVal: false,
    placeholder: 'Explainer Text',
    content:
      'YOU’VE MADE IT!! NOW WHAT? Imagine you’ve experienced success. Write a letter to yourself. Tell yourself the steps you did, the person you became, to get those results.',
    addVideoVal: false,
    youtubeUrl: ''
  },
  {
    id: 1,
    imageSrc: journalImg2,
    checkTitle: 'Vision Board',
    checkVal: false,
    placeholder: 'Explainer Text',
    content:
      'BRAINDUMP. What does it look like when you’ve reached your goal? What results will you have? Who will you have become?',
    addVideoVal: false,
    youtubeUrl: ''
  },
  {
    id: 2,
    imageSrc: journalImg3,
    checkTitle: 'Motivation Quote',
    checkVal: false,
    placeholder: 'Switch The Quote',
    content:
      'Today, I will do what others won’t, so tomorrow I can accomplish what others can’t.... Jerry Rice',
    addVideoVal: false,
    youtubeUrl: ''
  }
];

function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}

function JournalPageModal(props) {
  const { setIsOpenJournalPageModal, callback } = props;

  const {
    popup,
    popup__content,
    popup__content__header,
    popup__content__header__closeBtn,
    popup__content__body,
    bottom_con
  } = styles;

  const handleClickOutside = () => {
    setIsOpenJournalPageModal(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleResultButton = () => {
    const values = {};
    callback(values);
    setIsOpenJournalPageModal(false);
  };

  return (
    <div className={popup}>
      <div className={popup__content} ref={ref}>
        <div className={popup__content__header}>
          <button
            className={popup__content__header__closeBtn}
            onClick={() => setIsOpenJournalPageModal(false)}>
            <img src={closeMark} alt="close mark" />
          </button>
        </div>
        <div className={popup__content__body}>
          {data.map((item, index) => (
            <JournalPart key={index} content={item} />
          ))}
          <div className={bottom_con}>
            <NavButton
              type="button"
              txt="Awesome!! Add My Journal Pages and...NEXT!"
              bgColor="#FFC800"
              onClick={handleResultButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalPageModal;
