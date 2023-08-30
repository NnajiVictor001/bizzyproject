import React from 'react';
import TwoColumnsCard from 'components/Cards/TwoColumnsCard';

import placeholder from 'img/placeholder-imag.png';

function ConvertingSalesPage() {
  return (
    <div>
      <TwoColumnsCard
        image={placeholder}
        heading="High-converting Sales pages"
        coloredTxt="UPDATE COPY"
        description={
          "Quickly and easily publish your first Sales Page in a matter of minutes - not months. Our Instant Sales Page Creator Start with a conversion-optimized, mobile-responsive template. Then customize it inside the Builder, and launch a professional sales page that's designed to convert. "
        }
      />
    </div>
  );
}

export default ConvertingSalesPage;
