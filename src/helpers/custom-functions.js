import slugify from 'slugify';

export const randomArrayEl = (array, currVal) => {
  const selectFrom = array.filter((i) => i !== currVal);

  if (selectFrom.length <= 1) return array[0];

  const pos = Math.floor(Math.random() * selectFrom.length);
  return selectFrom[pos];
};

export const capitalizeFirstLetter = (string) => {
  if (string.length > 0) {
    const words = string.split(' ');

    return words.map((word) => word[0]?.toUpperCase() + word.substring(1)).join(' ');
  }
  return '';
};

export const RgbToHexColor = (val) => {
  if (val.includes('#')) return val;

  const rgbValues = val.match(/\((.*)\)/).pop();
  const rgbArr = rgbValues.split(',').map((v) => v.trim());
  const rgb = (rgbArr[0] << 16) | (rgbArr[1] << 8) | (rgbArr[2] << 0);
  const hexColor = `#${(0x1000000 + rgb).toString(16).slice(1)}`;

  return hexColor;
};

export const dropdownValues = (array, selectedIdsArray) => {
  const selectedValues = array.filter((t) => selectedIdsArray.includes(t.id));
  const returnedValue = [...new Set([...selectedValues, ...array])];

  return returnedValue;
};

export const wordingArray = (data, type) =>
  data.filter((d) => d.type === type).flatMap((d) => d.phrase);

function hex2(c) {
  c = Math.round(c);
  if (c < 0) c = 0;
  if (c > 255) c = 255;

  let s = c.toString(16);
  if (s.length < 2) s = `0${s}`;

  return s;
}

function color(r, g, b) {
  return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
}

export function shade(col, light) {
  // TODO: Assert that col is good and that -1 < light < 1
  if (!col) col = '#000';

  let r = parseInt(col.substr(1, 2), 16);
  let g = parseInt(col.substr(3, 2), 16);
  let b = parseInt(col.substr(5, 2), 16);

  if (light < 0) {
    r *= 1 + light;
    g *= 1 + light;
    b *= 1 + light;
  } else {
    r = (1 - light) * r + light * 255;
    g = (1 - light) * g + light * 255;
    b = (1 - light) * b + light * 255;
  }

  return color(r, g, b);
}

export function getCustomWebsiteUrl(subdomain) {
  const slugifiedSubdomain = slugify(subdomain, { lower: true });
  const base = window.location.host;
  const { protocol } = window.location;
  return process.env.NODE_ENV === 'production'
    ? `${protocol}//${slugifiedSubdomain}.${process.env.REACT_APP_CUSTOM_DOMAIN}`
    : `${protocol}//${base}/${slugifiedSubdomain}/${process.env.REACT_APP_CUSTOM_DOMAIN}`;
}
