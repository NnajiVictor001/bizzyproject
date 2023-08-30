import React, { useRef, useEffect, useState } from 'react';
import picker from 'img/picker2.svg';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import eye from 'img/eye.svg';
import eye_slash from 'img/eye-slash.svg';
import styles from './InputRichText.module.scss';

const BubbleTheme = Quill.import('themes/bubble');

class ExtendBubbleTheme extends BubbleTheme {
  constructor(quill, options) {
    super(quill, options);

    quill.on('selection-change', (range) => {
      if (range) {
        // quill.theme.tooltip.show();
        quill.theme.tooltip.hide();
        quill.theme.tooltip.position(quill.getBounds(range));
      }
    });
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme);

const toolbarOptions = [['bold']];
const formatOptions = ['bold'];

function InputRichText(props) {
  const {
    placeholder,
    id,
    value,
    pickerBgColor,
    onChange,
    onBlur,
    onClick,
    onHandleClickEye = () => {},
    onHandleChangeLabel = () => {},
    pickerNo,
    className,
    isEyeIcon,
    isEditLabel,
    metadata,
    readOnly = false
  } = props;
  const {
    input_refresh_container,
    input,
    input__field,
    pick_button_container,
    picker_no_border,
    input__placeholder,
    has_value,
    icon_eye
  } = styles;

  const defaultColor = '#9A9A9A';
  const [innerValue, setInnerValue] = useState(value);
  const [isShow, setIsShow] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [labelValue, setLabelValue] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  // const selectedStaff = useSelector((state) => state.staffPage.selectedStaffPage);
  const ref = useRef(null);
  const refLabel = useRef(null);

  useEffect(() => {
    if (value !== innerValue) setInnerValue(value);
  }, [value]);

  useEffect(() => {
    setLabelValue(placeholder);
  }, [placeholder]);

  useEffect(() => {
    if (metadata && metadata[id] && metadata[id].hide) {
      setIsShow(false);
    }
  }, []);

  const onBlurInput = () => {
    setHasFocus(false);
    if (onBlur) onBlur(innerValue);
  };

  const handleClick = () => {
    setIsShow(!isShow);
    if (onHandleClickEye) onHandleClickEye(id, isShow);
  };

  const handleClickLabel = (_evt) => {
    const computed = window.getComputedStyle(refLabel.current).getPropertyValue('top');
    if (innerValue?.replace(/<(.|\n)*?>/g, '').length > 0 || computed === '-8px') {
      setIsEdit(true);
      setHasFocus(true);
      ref.current.blur();
      refLabel.current.blur();
    } else if (hasFocus) {
      setIsEdit(true);
      setHasFocus(false);
    } else {
      ref.current.focus();
      setHasFocus(true);
    }
  };

  const onChangeValue = (val) => {
    onChange?.(val);
    setInnerValue(val);
  };

  const onChangeLabel = (evt) => {
    setLabelValue(evt.target.value);
    if (onHandleChangeLabel) onHandleChangeLabel(id, evt.target.value);
  };

  const onBlurLabel = () => {
    setIsEdit(false);
    setHasFocus(false);
  };

  const placeholderTxt = (
    <span className={input__placeholder} onClick={(evt) => handleClickLabel(evt)} ref={refLabel}>
      {placeholder}
    </span>
  );

  return (
    <>
      {isEyeIcon &&
        (isShow ? (
          <img src={eye} className={icon_eye} alt="eye" onClick={() => handleClick()} />
        ) : (
          <img src={eye_slash} className={icon_eye} alt="eye" onClick={() => handleClick()} />
        ))}
      <div className={`${input_refresh_container} ${className}`}>
        {!pickerNo && (
          <div
            className={pick_button_container}
            style={{
              backgroundColor: pickerBgColor || defaultColor
            }}
            onClick={onClick}>
            <img src={picker} alt={`picker${id}`} />
          </div>
        )}
        <div className={input} id={id}>
          <ReactQuill
            className={`${input__field} ${pickerNo && picker_no_border} ${
              (innerValue?.replace(/<(.|\n)*?>/g, '').length || hasFocus) && has_value
            }`}
            theme="bubble"
            modules={{ toolbar: toolbarOptions }}
            formats={formatOptions}
            value={innerValue}
            onChange={onChangeValue}
            readOnly={readOnly}
            ref={ref}
            onFocus={() => setHasFocus(true)}
            onBlur={() => onBlurInput()}
          />
          {isEditLabel ? (
            !isEdit ? (
              placeholderTxt
            ) : (
              <input
                id={id}
                autoFocus
                className={input__placeholder}
                style={{ width: 'calc(97%)' }}
                value={labelValue}
                required
                onChange={(evt) => onChangeLabel(evt)}
                onBlur={() => onBlurLabel()}
              />
            )
          ) : (
            placeholderTxt
          )}
        </div>
      </div>
    </>
  );
}

export default InputRichText;
