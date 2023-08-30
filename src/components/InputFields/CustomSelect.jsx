import React, { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControlLabel, Radio } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from './CustomSelect.module.scss';

function CustomSelect(props) {
  const { className, id, value, label, onChange, items, selectedValue } = props;
  const { textTopic } = styles;
  const [menuItems, setMenuItems] = useState();
  const [selectedTitle, setSelectedTitle] = useState(selectedValue);

  const clickHandler = (name) => {
    setSelectedTitle(name);
  };

  useEffect(() => {
    const menu = items.map((item, index) => (
      <MenuItem
        value={item.name}
        key={index}
        className={textTopic}
        onClick={() => clickHandler(item.name)}>
        <FormControlLabel
          id={id}
          value={item.name}
          checked={selectedTitle === item.name}
          key={index}
          control={<Radio color="default" />}
          label={
            <span
              style={{
                fontSize: '1.6rem',
                color: '#757575',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}>
              {item.name}
            </span>
          }
        />
      </MenuItem>
    ));

    setMenuItems(menu);
  }, [selectedTitle]);

  return (
    <FormControl className={className}>
      <InputLabel
        id={id}
        style={{
          fontSize: '1.6rem',
          color: '#000',
          fontFamily: '"Plus Jakarta Sans", sans-serif'
        }}>
        {label}
      </InputLabel>
      <Select
        IconComponent={() => <KeyboardArrowDownIcon fontSize="large" />}
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        style={{
          fontSize: '1.6rem',
          borderRadius: '1rem',
          color: '#757575',
          fontWeight: '700',
          fontFamily: '"Plus Jakarta Sans", sans-serif'
        }}
        MenuProps={{ style: { height: '30rem' } }}
        renderValue={(selected) => selected}>
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
