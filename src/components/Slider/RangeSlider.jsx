import React from 'react';

import Slider from '@mui/material/Slider';

function valuetext(value) {
  return value;
}

const marks = [
  {
    value: 1,
    label: '1m'
  },
  {
    value: 2,
    label: '2m'
  },
  {
    value: 3,
    label: '3m'
  },
  {
    value: 4,
    label: '4m'
  },
  {
    value: 5,
    label: '5m'
  },
  {
    value: 6,
    label: '6m'
  },
  {
    value: 7,
    label: '7m'
  },
  {
    value: 8,
    label: '8m'
  },
  {
    value: 9,
    label: '9m'
  },
  {
    value: 10,
    label: '10m'
  },
  {
    value: 11,
    label: '11m'
  },
  {
    value: 12,
    label: '12m'
  }
];

function RangeSlider(props) {
  const { onChange } = props;

  const rangeSliderChange = (evt) => {
    const sliderValue = evt.target.value;
    onChange(sliderValue);
  };

  return (
    <Slider
      aria-label="Months"
      defaultValue={1}
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      step={1}
      marks={marks}
      min={1}
      max={12}
      onChange={rangeSliderChange}
    />
  );
}

export default RangeSlider;
