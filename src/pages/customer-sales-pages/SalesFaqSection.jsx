import React from 'react';
import { useSelector } from 'react-redux';
import SalesFaqAccordion from './SalesFaqAccordion';

import styles from './SalesFaqSection.module.scss';

function SalesFaqSection(props) {
  const { main, main__title, main__accordion, container } = styles;
  const { bookName, webBaseColor } = props;
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  const faqData = [
    {
      question: `How Do I Know ${bookName} Is Right For Me?`,
      answer: `The ${bookName} and the Real Simple Chore Chart is for anyone looking for a way to take back their busy lives, cultivate new and EASIER cleaning habits, help their kids develop simple routines, seriously - spend less time stressing and MORE time with the people they love.`
    },
    {
      question: 'Can I Print More Than One?',
      answer: `Your purchase of The ${bookName} and the Real Simple Chore Chart covers the needs of your home (today and many years over). If you wish to print multiple copies, feel free to do so. Sharing the files with others outside your home is strictly prohibited under our copyright.`
    },
    {
      question: 'Is This Really Worth The Cost?',
      answer: `Absolutely! The ${bookName} and the Real Simple Chore Chart will pay for itself within a day of applying them. And for many years to come. Buy it once and print it over and over again. You will not find a better, more practical, and more comprehensive bundle at a lower price.`
    },
    {
      question: 'How Soon After Purchasing Will I Receive My Product?',
      answer:
        '(Almost) immediately! Your purchase will be delivered directly on the confirmation page and will also be emailed to you, via the email address you provide at checkout. It should arrive within 5-10 minutes of your purchase.'
    },
    {
      question: "Help I Can't Open The File?",
      answer:
        'To open a PDF file, you will need a program that is probably already installed on your computer. This program will enable you to view PDF files from another site or source. If you don’t have a program, you can get one free with a simple Google search. '
    },
    {
      question: 'What Is Your Refund Policy',
      answer:
        "Our number one priority is your happiness. This means we stand by our products 100%. If you have a problem, we will try to fix it. Refund it. Send you a virtual hug. Whatever it takes. Just reach out. We're in this together, and we're here for you. But PLEASE be sure to read the product descriptions and the FAQ's on this page before purchasing. We also want MORE time with those we love, and answering questions or issuing refunds takes some of that precious time away. 🤗"
    }
  ];

  return (
    <div className={container}>
      <div className={main} style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
        <p className={main__title}>You have questions!! We have ANSWERS!</p>
        <h1>FAQ’s</h1>
        <div className={main__accordion}>
          <SalesFaqAccordion
            webBaseColor={webBaseColor || selectedBaseWebsiteColor}
            faqData={faqData}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesFaqSection;
