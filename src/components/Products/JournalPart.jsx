import InputCheckbox from 'components/InputFields/InputCheckbox';
import React, { useState } from 'react';

import refresh from 'img/refresh.svg';
import Input from 'components/InputFields/Input';
import styles from './JournalPart.module.scss';

function JournalPart(props) {
  const { main, image_con, check_con, check_con__refresh, add_video_con, content_txt } = styles;

  const {
    content: { id, imageSrc, checkTitle, checkVal, placeholder, content, addVideoVal, youtubeUrl }
  } = props;

  const [checkedVal, setCheckedVal] = useState(checkVal);
  const [contentVal, setContentVal] = useState(content);
  const [addedVideoVal, setAddedVideoVal] = useState(addVideoVal);
  const [youtubeUrlVal, setYoutubeUrlVal] = useState(youtubeUrl);

  const checkValInputHandler = (evt) => {
    setCheckedVal(evt.target.checked);
  };

  const contentValInputHandler = (evt) => {
    setContentVal(evt.target.value);
  };

  const refreshBtnClickHandler = () => {
    setContentVal('');
  };

  const addedVideoValInputHandler = (evt) => {
    setAddedVideoVal(evt.target.checked);
  };

  const youtubeUrlValInputHandler = (evt) => {
    setYoutubeUrlVal(evt.target.value);
  };

  return (
    <div className={main}>
      <div className={image_con}>
        <img src={imageSrc} alt={`top_journal${id}`} />
      </div>
      <div className={check_con}>
        <InputCheckbox
          id={`${checkTitle}${id}`}
          checked={checkedVal}
          onChange={checkValInputHandler}
          label={`${checkTitle}`}
        />
        <div className={check_con__refresh} onClick={refreshBtnClickHandler}>
          <img src={refresh} alt={`refresh${id}`} />
        </div>
      </div>
      <Input
        type="text"
        textArea
        id={`${placeholder}${id}`}
        value={contentVal}
        onChange={contentValInputHandler}
        placeholder={placeholder}
        className={content_txt}
      />
      <div className={add_video_con}>
        <InputCheckbox
          id={`${addVideoVal}${id}`}
          checked={addedVideoVal}
          onChange={addedVideoValInputHandler}
          label="Add a Video?"
        />
      </div>
      <Input
        type="url"
        id={`youtubeUrl${id}`}
        value={youtubeUrlVal}
        onChange={youtubeUrlValInputHandler}
        placeholder="YouTubeUrl"
        disabled={!addedVideoVal}
      />
    </div>
  );
}

export default JournalPart;
