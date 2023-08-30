import React from 'react';
import styles from './LeadMagGetStartedSection.module.scss';
import LeadMagGetStartedCard from './LeadMagGetStartedCard';
import LeadMagGetStartedText from './LeadMagGetStartedText';

import LeadMagGetStartedForm from './LeadMagGetStartedForm';

function LeadMagGetStartedSection() {
  const { main, main__header, main__header__right_con } = styles;

  return (
    <div className={main}>
      <div className={main__header}>
        <LeadMagGetStartedText />
        <div className={main__header__right_con}>
          <LeadMagGetStartedCard
            icon="iconspace_Bill"
            title="10 Second Sign Up"
            content="Your files will be sent your way in seconds!"
          />
          <LeadMagGetStartedCard
            icon="iconspace_Select"
            title="Instant Download"
            content="Get your files in a snap. Simply download."
          />
          <LeadMagGetStartedCard
            icon="iconspace_Board"
            title="Get Started"
            content="Say goodbye to feeling frantic and stressed!"
          />
        </div>
      </div>
      <LeadMagGetStartedForm />
    </div>
  );
}

export default LeadMagGetStartedSection;
