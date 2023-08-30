import React, { useState } from 'react';
import PickMyBaseTextColor from 'components/Products/PickMyBaseTextColor';
import Input from 'components/InputFields/Input';
import InputRefresh from 'components/InputFields/InputRefresh';
import Pallete from 'components/SlideShow/Pallete';
import DialogChangeColor from 'helpers/DialogChangeColor';
import InputWithVisibility from 'components/InputFields/InputWithVisibility';

import EyeIcon from 'img/eyeIcon.png';
import styles from './LeadMagnetCard.module.scss';
import EditUserColors from './EditUserColors';

const initialFormData = {
  shortBlurp1:
    '...For When You Have NO CLUE What to Create A Video About...OR how to USE that content to SELL your products and programs!!',
  heading1: '50 LIVE VIDEO IDEAS',
  subHeading1: 'Print these and pick a number.  Create your Content.  Rinse and Repeat.',
  textBox1:
    "Let's Create Your Coals & CRUSH Them! For a limited time, get access to our Profitable Paint Party  Planner & Journal for just $13.99 (a $27 value!)It's designed to help you get your parties booked!",
  heading2: 'Just imagine reaching your Paint Party goals - consistently - you could...',
  shortBlurp2:
    'We Tell You the Phrases that HURT Your Reach... AND... Give You Replacement Words to Use Instead.',
  subHeading2: 'Enter your name and email below to get it sent straight to your inbox',
  button: 'SHWEET!  Send me the Post Ideas!'
};

function LeadMagnetCard() {
  const {
    main,
    main__colorBoxesCont,
    main__editolorontainer,
    main__colorBoxText,
    main__textBoxInputContainer,
    main__textAreaPlaceholder,
    main__textAreaInput,
    main__inputWidth,
    main__simpleInputPlaceholder,
    main__simpleInput,
    main__simpleInputContainer,
    main__divider,
    main__simpleInputContainerB,
    main__colorInputContainer,
    main__editColor,
    flex__input
  } = styles;

  const [idHeadingChanged, setIdHeadingChanged] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [heading1Color, setHeading1Color] = useState('#000000');
  const [heading2Color, setHeading2Color] = useState('#000000');
  const [buttonColor, setButtonColor] = useState('#000000');

  const changeColorHandler = (id) => {
    setIdHeadingChanged(id);
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const selectColor = (color) => {
    if (idHeadingChanged === 'heading1') {
      setHeading1Color(color);
    } else if (idHeadingChanged === 'heading2') {
      setHeading2Color(color);
    } else if (idHeadingChanged === 'button') {
      setButtonColor(color);
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

  const [showInput1, setShowInput1] = useState(true);
  const toggleInputVisibility1 = () => {
    console.log(1);
    setShowInput1(!showInput1);
  };

  const [showInput2, setShowInput2] = useState(true);
  const toggleInputVisibility2 = () => {
    console.log(2);
    setShowInput2(!showInput2);
  };

  const [formValues, setFormValues] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <div className={main}>
      <div className={main__editolorontainer}>
        <div className={main__editColor}>
          <EditUserColors right="1rem" />
        </div>
        <div>
          <p className={main__colorBoxText}>Pick a Base Text Color</p>
          <PickMyBaseTextColor className={main__colorBoxesCont} noText />
        </div>
      </div>
      <div>
        <div className={main__textBoxInputContainer}>
          <img src={EyeIcon} alt="eye" />
          <div className={main__inputWidth}>
            <Input
              placeholderClass={main__textAreaPlaceholder}
              className={main__textAreaInput}
              textArea
              placeholder="Short Blurp "
              loader
              value={formValues.shortBlurp1}
              onChange={handleInputChange}
              name="shortBlurp1"
              top={8}
            />
          </div>
        </div>
        <InputWithVisibility
          type="text"
          id="heading1"
          name="heading1"
          showInput={showInput1}
          toggleInputVisibility={toggleInputVisibility1}
          value={formValues.heading1}
          pickerBgColor={heading1Color}
          onChange={handleInputChange}
          placeholder="Heading"
          changeColorHandler={changeColorHandler}
        />
        <div className={main__simpleInputContainer}>
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="Subheading"
            loader
            value={formValues.subHeading1}
            name="subHeading1"
            onChange={handleInputChange}
          />
        </div>
        <div className={main__simpleInputContainer}>
          <Input
            placeholderClass={main__textAreaPlaceholder}
            className={main__textAreaInput}
            textArea
            placeholder="Text Box"
            value={formValues.textBox1}
            loader
            top={8}
            name="textBox1"
            onChange={handleInputChange}
          />
        </div>
        <InputWithVisibility
          type="text"
          id="heading2"
          name="heading2"
          showInput={showInput2}
          toggleInputVisibility={toggleInputVisibility2}
          value={formValues.heading2}
          pickerBgColor={heading2Color}
          onChange={handleInputChange}
          placeholder="Heading"
          changeColorHandler={changeColorHandler}
        />
        <div className={main__simpleInputContainer}>
          <Input
            placeholderClass={main__textAreaPlaceholder}
            className={main__textAreaInput}
            textArea
            placeholder="Short Blurp"
            loader
            value={formValues.shortBlurp2}
            name="shortBlurp2"
            onChange={handleInputChange}
            top={8}
          />
        </div>
        <div className={main__divider} />
        <div className={main__simpleInputContainerB}>
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="Subheading"
            value={formValues.subHeading2}
            name="subHeading2"
            onChange={handleInputChange}
            loader
          />
        </div>
        <div className={main__colorInputContainer}>
          <InputRefresh
            type="text"
            id="button"
            name="button"
            value={formValues.button}
            pickerBgColor={buttonColor}
            onChange={handleInputChange}
            placeholder="Button"
            changeColorHandler={changeColorHandler}
            className={flex__input}
          />
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

export default LeadMagnetCard;
