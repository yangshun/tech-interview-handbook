import React from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import clsx from 'clsx';

import styles from './styles.module.css';

const BACKGROUNDS = [
  styles.backgroundBlue,
  styles.backgroundGreen,
  styles.backgroundOrange,
  styles.backgroundPurple,
  styles.backgroundRed,
];

export default React.memo(function SidebarAd() {
  const backgroundClass = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  
  return (
    <a
      className={clsx(styles.container, backgroundClass)}
      href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_docs_sidebar"
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        window.gtag('event', 'moonchaser.click');
      }}>
      <p className={styles.tagline}>
        <strong>Get paid more.</strong> Receive risk-free salary negotiation
        help from Moonchaser. You pay nothing unless your offer is increased.
      </p>
    </a>
  );
});
