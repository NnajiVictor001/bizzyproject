import React from 'react';

import TwoColumnsCard from 'components/Cards/TwoColumnsCard';

import placeholder from 'img/placeholder-imag.png';

function Insights() {
  return (
    <TwoColumnsCard
      imageRight
      image={placeholder}
      coloredTxt="UPDATE COPY"
      heading="Get the insights you need to guess less & Make more"
      description="Confidently optimize every aspect of your digital products with the help of an easy-to-read dashboard, a/b split tests, and real-time conversion tips you won’t find anywhere else."
    />
  );
}

export default Insights;
