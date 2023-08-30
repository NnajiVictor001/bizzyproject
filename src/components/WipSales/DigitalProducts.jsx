import React from 'react';

import TwoColumnsCard from 'components/Cards/TwoColumnsCard';

import placeholder from 'img/placeholder-imag.png';

function DigitalProducts() {
  const link = {
    text: 'See More Templates >',
    path: ''
  };
  return (
    <div>
      <TwoColumnsCard
        imageRight
        coloredTxt="UPDATE COPY"
        heading="done for you Digital Products"
        description="Skip  designers, freelancers, copywritters, delays, and extra expenses—our  tools make it easy to create, publish, launch, and sell your digital products at the drop of a hat. "
        image={placeholder}
        link={link}
      />
    </div>
  );
}

export default DigitalProducts;
