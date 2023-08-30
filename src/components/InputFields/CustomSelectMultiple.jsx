import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { dropdownValues } from 'helpers/custom-functions';

import styles from './CustomSelect.module.scss';
import InputCheckbox from './InputCheckbox';

function CustomSelectMultiple(props) {
  const { className, id, value, label, onChange, items, selectedIds } = props;
  const { textTopic, textTopic__label } = styles;
  const [menuItems, setMenuItems] = useState();
  const [allItems, setAllItems] = useState(items);
  const [selectedValues, setSelectedValues] = useState(selectedIds);

  const clickHandler = (selected_id) => {
    if (selectedValues.includes(selected_id)) {
      setSelectedValues((selectedVal) => [...selectedVal.filter((s) => s !== selected_id)]);
      const result = dropdownValues(allItems, [...selectedValues.filter((s) => s !== selected_id)]);
      setAllItems(result);
    } else {
      setSelectedValues((selectedVal) => [...selectedVal, selected_id]);
      const result = dropdownValues(allItems, [...selectedValues, selected_id]);
      setAllItems(result);
    }
  };

  const changeHandler = () => {
    console.log(1);
  };

  useEffect(() => {
    setSelectedValues(selectedIds);
    const result = dropdownValues(allItems, selectedIds);
    setAllItems(result);
  }, [selectedIds]);

  useEffect(() => {
    let menu = allItems.map((item, index) => (
      <MenuItem
        value={item.name}
        key={index}
        className={textTopic}
        onClick={() => clickHandler(item.id)}>
        <InputCheckbox
          id={id}
          checked={selectedValues && selectedValues.includes(item.id)}
          label={item.name}
          key={index}
          onChange={changeHandler}
          className={textTopic__label}
        />
      </MenuItem>
    ));
    if (selectedValues) {
      menu = [
        ...menu.slice(0, selectedValues.length),
        <Divider key={-1} />,
        ...menu.slice(selectedValues.length)
      ];
    }
    setMenuItems(menu);
  }, [selectedValues]);

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
        multiple
        MenuProps={{ style: { height: '30rem' } }}
        renderValue={(selected) => {
          if (selected.constructor === Array) {
            return selected.join(', ');
          }
          return selected;
        }}>
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default CustomSelectMultiple;
