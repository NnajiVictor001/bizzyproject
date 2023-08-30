import { capitalizeFirstLetter } from './custom-functions';

export const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const randomDifferentItem = (value, array) => {
  const filteredArray = array.filter((item) => item !== value);

  return filteredArray[Math.floor(Math.random() * filteredArray.length)];
};

export const isObjEmpty = (obj) => Object.values(obj).length === 0 && obj.constructor === Object;

export const randomNichePhraseGenerator = (wording) => {
  if (wording.length > 0) {
    const nichePhrases = wording
      .flatMap((b) => b.niche_phrases)
      .flatMap((b) => b[1])
      .map((item) => capitalizeFirstLetter(item));

    return nichePhrases;
  }
  return [];
};

export const applyColorSaturationToHexColor = (hex, saturationPercent) => {
  if (!/^#([0-9a-f]{6})$/i.test(hex)) {
    throw Error('Unexpected color format');
  }

  if (saturationPercent < 0 || saturationPercent > 100) {
    throw Error('Unexpected color format');
  }

  const saturationFloat = saturationPercent / 100;
  const rgbIntensityFloat = [
    parseInt(hex.substr(1, 2), 16) / 255,
    parseInt(hex.substr(3, 2), 16) / 255,
    parseInt(hex.substr(5, 2), 16) / 255
  ];

  const rgbIntensityFloatSorted = rgbIntensityFloat.slice(0).sort((a, b) => a - b);
  const maxIntensityFloat = rgbIntensityFloatSorted[2];
  const mediumIntensityFloat = rgbIntensityFloatSorted[1];
  const minIntensityFloat = rgbIntensityFloatSorted[0];

  if (maxIntensityFloat === minIntensityFloat) {
    // All colors have same intensity, which means
    // the original color is gray, so we can't change saturation.
    return hex;
  }

  // New color max intensity wont change. Lets find medium and weak intensities.
  let newMediumIntensityFloat;
  const newMinIntensityFloat = maxIntensityFloat * (1 - saturationFloat);

  if (mediumIntensityFloat === minIntensityFloat) {
    // Weak colors have equal intensity.
    newMediumIntensityFloat = newMinIntensityFloat;
  } else {
    // Calculate medium intensity with respect to original intensity proportion.
    const intensityProportion =
      (maxIntensityFloat - mediumIntensityFloat) / (mediumIntensityFloat - minIntensityFloat);
    newMediumIntensityFloat =
      (intensityProportion * newMinIntensityFloat + maxIntensityFloat) / (intensityProportion + 1);
  }

  const newRgbIntensityFloat = [];
  const newRgbIntensityFloatSorted = [
    newMinIntensityFloat,
    newMediumIntensityFloat,
    maxIntensityFloat
  ];

  // We've found new intensities, but we have then sorted from min to max.
  // Now we have to restore original order.
  rgbIntensityFloat.forEach((originalRgb) => {
    const rgbSortedIndex = rgbIntensityFloatSorted.indexOf(originalRgb);
    newRgbIntensityFloat.push(newRgbIntensityFloatSorted[rgbSortedIndex]);
  });

  const floatToHex = (val) => `0${Math.round(val * 255).toString(16)}`.substr(-2);
  const rgb2hex = (rgb) => `#${floatToHex(rgb[0])}${floatToHex(rgb[1])}${floatToHex(rgb[2])}`;

  const newHex = rgb2hex(newRgbIntensityFloat);

  return newHex;
};
