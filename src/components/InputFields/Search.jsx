import React from 'react';
import SearchIcon from 'img/search_icon.svg';
import styles from './Search.module.scss';

function Search(props) {
  const { search_wrapper, search_input } = styles;
  const { placeholder, className, value, onChange } = props;

  return (
    <div className={`${search_wrapper} ${className}`}>
      <img src={SearchIcon} alt="search icon" />
      <input
        type="search"
        name="search-form"
        id="search-form"
        className={search_input}
        placeholder={placeholder || 'Search users'}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
