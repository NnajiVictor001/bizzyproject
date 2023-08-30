import React from 'react';
import { Link } from 'react-router-dom';

import SecondaryHeading from 'components/Typography/SecondaryHeading';
import Accordion from 'components/Accordion/Accordion';

import styles from './Faq.module.scss';

function Faq() {
  const { main, main__txt, main__accordion, main__accordionItem } = styles;
  const accordionData = [
    {
      title: 'Why should I use Bizzy?',
      description: 'Elementum ullamcorper felis nulla scelerisque. Nunc enim nunc mattis leo massa.'
    },
    {
      title: 'Is Bizzy free?',
      description: 'Elementum ullamcorper felis nulla scelerisque. Nunc enim nunc mattis leo massa.'
    },
    {
      title: 'Question?',
      description: 'Elementum ullamcorper felis nulla scelerisque. Nunc enim nunc mattis leo massa.'
    },
    {
      title: 'Question?',
      description: 'Elementum ullamcorper felis nulla scelerisque. Nunc enim nunc mattis leo massa.'
    },
    {
      title: 'Question?',
      description: 'Elementum ullamcorper felis nulla scelerisque. Nunc enim nunc mattis leo massa.'
    }
  ];
  return (
    <div className={main}>
      <SecondaryHeading txt="FAQ’s" />
      <p className={main__txt}>
        Still have a question? <Link to="/register/user-data">sign up</Link> , it’s free and take a
        spin around.
      </p>
      <div className={main__accordion}>
        {accordionData.map((item, index) => (
          <div key={index}>
            <Accordion title={item.title}>
              <p className={main__accordionItem}>{item.description}</p>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
