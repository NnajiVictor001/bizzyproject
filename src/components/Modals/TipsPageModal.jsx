import React, { useState, useEffect, useRef } from 'react';

import closeMark from 'img/close.svg';
import tipsPageImg from 'img/tips_page.png';
import layout3Img from 'img/layout3.png';
import layout4Img from 'img/layout4.png';
import SelectImage from 'components/Layouts/SelectImages';
import InputRefresh from 'components/InputFields/InputRefresh';
import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';
import NavButton from 'components/Buttons/NavButton';
import DialogChangeColor from 'helpers/DialogChangeColor';
import Pallete from 'components/SlideShow/Pallete';
import styles from './TipsPageModal.module.scss';

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

function TipsPageModal(props) {
  const { setIsOpenTipsPageModal, callback } = props;

  const images = [
    {
      id: 0,
      item: tipsPageImg
    },
    {
      id: 1,
      item: layout3Img
    },
    {
      id: 2,
      item: layout4Img
    }
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [heading, setHeading] = useState('EXERCISE #4');
  const [headingColor, setHeadingColor] = useState('#0085FF');

  const [paragraph, setParagraph] = useState(
    'IF YOU’RE STUCK... JUMP IN HERE!  Usually, stuck means one of three things.  Either you don’t have a goal, your goal is not big enough, or maybe you need to track and tweak the steps in your plan to get there.'
  );
  const [shorterTip1, setShorterTip1] = useState('GET STARTED You did that!  You are here.');
  const [shorterTip1Color, setShorterTip1Color] = useState('#EB63E6');

  const [shorterTip2, setShorterTip2] = useState(
    'MAKE YOUR GOAL MORE SPECIFIC Give your goal a number, steps, something to measure!'
  );
  const [shorterTip2Color, setShorterTip2Color] = useState('#EB63E6');

  const [shorterTip3, setShorterTip3] = useState(
    "KNOW WHAT TO TRACK... AND TRACK IT! What you track you will achieve!  It's scientifically proven!  Don't know what to track?  Watch the video below... OR jump into GLAM and talk to one of our coaches!!"
  );
  const [shorterTip3Color, setShorterTip3Color] = useState('#EB63E6');

  const [shorterTip4, setShorterTip4] = useState(
    "GIVE YOURSELF ACCOUNTABILITY Alone we struggle. The good news is you don't need to be alone.  We have a group for you (it's FREE) for peer-support.  If you prefer a more committed level of support and accountability GLAM is here for you!"
  );
  const [shorterTip4Color, setShorterTip4Color] = useState('#EB63E6');

  const [addVideo, setAddVideo] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [idInputChanged, setIdInputChanged] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const {
    popup,
    popup__content,
    popup__content__header,
    popup__content__header__closeBtn,
    popup__content__body,
    popup__content__body__left,
    popup__content__body__right_con,
    upper_body,
    title,
    full_width,
    bottom_con,
    video_con,
    video_con__youtube,
    additional_top,
    scrollable
  } = styles;

  const handleClickOutside = () => {
    if (!showPopup) setIsOpenTipsPageModal(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const headingInputChangeHandler = (evt) => {
    setHeading(evt.target.value);
  };

  const headingInputClickHandler = () => {
    console.log('The value of the heading input is=>', heading);
  };

  const paragraphInputHandler = (evt) => {
    setParagraph(evt.target.value);
  };

  const shorterTip1InputChangeHandler = (evt) => {
    setShorterTip1(evt.target.value);
  };

  const shorterTip1InputClickHandler = () => {
    console.log('The value of the shorter tip 1 input is=>', shorterTip1);
  };

  const shorterTip2InputChangeHandler = (evt) => {
    setShorterTip2(evt.target.value);
  };

  const shorterTip2InputClickHandler = () => {
    console.log('The value of the shorter tip 2 input is=>', shorterTip2);
  };

  const shorterTip3InputChangeHandler = (evt) => {
    setShorterTip3(evt.target.value);
  };

  const shorterTip3InputClickHandler = () => {
    console.log('The value of the shorter tip 3 input is=>', shorterTip3);
  };

  const shorterTip4InputChangeHandler = (evt) => {
    setShorterTip4(evt.target.value);
  };

  const shorterTip4InputClickHandler = () => {
    console.log('The value of the shorter tip 4 input is=>', shorterTip4);
  };

  const addVideoInputHandler = (evt) => {
    setAddVideo(evt.target.checked);
  };

  const youtubeUrlInputHandler = (evt) => {
    setYoutubeUrl(evt.target.value);
  };

  const handleResultButton = () => {
    const values = {
      selectedImage,
      heading,
      paragraph,
      shorterTip1,
      shorterTip2,
      shorterTip3,
      shorterTip4,
      addVideo,
      youtubeUrl
    };
    callback(values);
    setIsOpenTipsPageModal(false);
  };

  const changeColorHandler = (id) => {
    setIdInputChanged(id);
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const selectColor = (color) => {
    if (idInputChanged === 'heading') {
      setHeadingColor(color);
    } else if (idInputChanged === 'shorterTip1') {
      setShorterTip1Color(color);
    } else if (idInputChanged === 'shorterTip2') {
      setShorterTip2Color(color);
    } else if (idInputChanged === 'shorterTip3') {
      setShorterTip3Color(color);
    } else if (idInputChanged === 'shorterTip4') {
      setShorterTip4Color(color);
    }
  };

  // This should be the saved pallete of the product
  const productPalleteData = {
    id: 1,
    name: 'PALETTE - 1',
    selected: false,
    bars: [
      {
        id: 0,
        value: '#9ACC39',
        name: 'Color 1'
      },
      {
        id: 1,
        value: '#5CE1E6',
        name: 'Color 2'
      },
      {
        id: 2,
        value: '#FFA924',
        name: 'Color 3'
      },
      {
        id: 3,
        value: '#FFC601',
        name: 'Color 4'
      },
      {
        id: 4,
        value: '#1DAEB3',
        name: 'Color 5'
      }
    ]
  };
  const productPallete = (
    <Pallete resource={productPalleteData} chooseOneColorFromPallete selectColor={selectColor} />
  );

  return (
    <div className={popup}>
      <div className={popup__content} ref={ref}>
        <div className={popup__content__header}>
          <button
            className={popup__content__header__closeBtn}
            onClick={() => setIsOpenTipsPageModal(false)}>
            <img src={closeMark} alt="close mark" />
          </button>
        </div>
        <div className={popup__content__body}>
          <div className={popup__content__body__left}>
            <SelectImage
              images={images}
              selectedImage={selectedImage}
              handleImageClick={handleImageClick}
            />
          </div>
          <div className={popup__content__body__right_con}>
            <div className={upper_body}>
              <p className={title}>Tips Page.</p>
              <InputRefresh
                type="text"
                id="heading"
                value={heading}
                pickerBgColor={headingColor}
                onChange={headingInputChangeHandler}
                onClick={headingInputClickHandler}
                placeholder="Heading"
                changeColorHandler={changeColorHandler}
              />
              <div className={`${full_width} ${additional_top}`}>
                <Input
                  type="text"
                  textArea
                  id="tellus"
                  value={paragraph}
                  onChange={paragraphInputHandler}
                  placeholder="Paragraph"
                />
              </div>
              <div className={scrollable}>
                <div className={`${full_width} ${additional_top}`}>
                  <InputRefresh
                    type="text"
                    textArea
                    id="shorterTip1"
                    value={shorterTip1}
                    pickerBgColor={shorterTip1Color}
                    onChange={shorterTip1InputChangeHandler}
                    onClick={shorterTip1InputClickHandler}
                    placeholder="Shorter Tip #1"
                    changeColorHandler={changeColorHandler}
                  />
                </div>
                <div className={full_width}>
                  <InputRefresh
                    type="text"
                    textArea
                    id="shorterTip2"
                    value={shorterTip2}
                    pickerBgColor={shorterTip2Color}
                    onChange={shorterTip2InputChangeHandler}
                    onClick={shorterTip2InputClickHandler}
                    placeholder="Shorter Tip #2"
                    changeColorHandler={changeColorHandler}
                  />
                </div>
                <div className={full_width}>
                  <InputRefresh
                    type="text"
                    textArea
                    format="middle"
                    id="shorterTip3"
                    value={shorterTip3}
                    pickerBgColor={shorterTip3Color}
                    onChange={shorterTip3InputChangeHandler}
                    onClick={shorterTip3InputClickHandler}
                    placeholder="Tip #3"
                    changeColorHandler={changeColorHandler}
                  />
                </div>
                <div className={full_width}>
                  <InputRefresh
                    type="text"
                    textArea
                    format="long"
                    id="shorterTip4"
                    value={shorterTip4}
                    pickerBgColor={shorterTip4Color}
                    onChange={shorterTip4InputChangeHandler}
                    onClick={shorterTip4InputClickHandler}
                    placeholder="Longer Tip #4"
                    changeColorHandler={changeColorHandler}
                  />
                </div>
              </div>
              <div className={video_con}>
                <InputCheckbox
                  id="addvideo"
                  checked={addVideo}
                  onChange={addVideoInputHandler}
                  label="Add a Video?"
                />
                <div className={video_con__youtube}>
                  <Input
                    type="url"
                    id="youtubeUrl"
                    value={youtubeUrl}
                    onChange={youtubeUrlInputHandler}
                    placeholder="Video Youtube URL"
                    disabled={!addVideo}
                  />
                </div>
              </div>
              <div className={bottom_con}>
                <NavButton
                  type="button"
                  txt="Awesome!! Add To My Product"
                  bgColor="#FFC800"
                  onClick={handleResultButton}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogChangeColor
        onClose={onClose}
        open={showPopup}
        handleItem={changeColorHandler}
        pallete={productPallete}
      />
    </div>
  );
}

export default TipsPageModal;
