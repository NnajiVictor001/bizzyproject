import React from 'react';

import TwoColumnsCard from 'components/Cards/TwoColumnsCard';

import placeholder from 'img/placeholder-imag.png';

function EmailsMarketing() {
  return (
    <TwoColumnsCard
      image={placeholder}
      coloredTxt="UPDATE COPY"
      heading="? Emails/Marketing"
      description="Because you don’t believe in limits, neither do we. That’s why, unlike other platforms, we don’t charge more for the number of Products You Create or Sales pages you publish."
    />
  );
}

export default EmailsMarketing;
