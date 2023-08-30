import React, { forwardRef, useState } from 'react';

import upArrowMark from 'img/up_arrow.svg';
import downArrowMark from 'img/down_arrow.svg';
import styles from './ListFilter.module.scss';
import withClickOutside from './withClickOutside';

const ListFilter = forwardRef((props, ref) => {
  const { content, open, setOpen } = props;
  const { title, list, callback } = content;

  const [displayTitle, setDisplayTitle] = useState(title);

  const handleClickItem = (item) => {
    setOpen(!open);
    setDisplayTitle(item);
    callback(item);
  };

  const { list_filter, list_filter__body, list_filter__item } = styles;

  return (
    <div ref={ref}>
      <div className={list_filter} onClick={() => setOpen(!open)}>
        <p>{displayTitle}</p>
        {open ? (
          <img src={upArrowMark} alt="up mark" />
        ) : (
          <img src={downArrowMark} alt="down mark" />
        )}
      </div>
      {open && (
        <ul className={list_filter__body}>
          {list.map((item, index) => (
            <li key={index} className={list_filter__item} onClick={() => handleClickItem(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default withClickOutside(ListFilter);
