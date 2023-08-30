import React from 'react';

import TwoColumnsCard from 'components/Cards/TwoColumnsCard';

import placeholder from 'img/placeholder-imag.png';

function LoveToBuy() {
  const list = ['design', 'copy', 'sales page', 'emails', 'posting schedule'];

  return (
    <TwoColumnsCard
      list={list}
      image={placeholder}
      description="Wherever you’re publishing or posting content, now you can monetize it in minutes. Turn your hard-won web traffic into more leads and sales with a complete digital product conversion toolkit, including:"
      coloredTxt="UPDATE COPY TAKEN FROM LEADPAGES"
      heading="?? products people love to Buy"
    />
  );
}

export default LoveToBuy;
