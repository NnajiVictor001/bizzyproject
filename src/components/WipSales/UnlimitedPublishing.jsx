import React from 'react';

import TwoColumnsCard from 'components/Cards/TwoColumnsCard';

import placeholder from 'img/placeholder-imag.png';

function UnlimitedPublishing() {
  return (
    <TwoColumnsCard
      imageRight
      image={placeholder}
      coloredTxt="UPDATE COPY"
      heading="unlimited publishing & Commercial Rights "
      description="Because you don’t believe in limits, neither do we. That’s why, unlike other platforms, we don’t charge more for the number of Products You Create or Sales pages you publish."
    />
  );
}

export default UnlimitedPublishing;
