import React from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import clsx from 'clsx';

import styles from './styles.module.css';

const BACKGROUNDS = [
  styles.backgroundBlue,
  styles.backgroundOrange,
  styles.backgroundPurple,
  styles.backgroundRed,
];

export default React.memo(function SidebarAd() {
  const backgroundClass =
    BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

  return Math.random() > 0.5 ? (
    <a
      className={clsx(styles.container, backgroundClass)}
      href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_docs_sidebar"
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        window.gtag('event', 'moonchaser.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Get paid more.</strong> Receive risk-free salary negotiation
        help from Moonchaser. You pay nothing unless your offer is increased.
      </p>
    </a>
  ) : (
    <a
      className={clsx(styles.container, backgroundClass)}
      href="https://www.levels.fyi/services/?ref=TechInterviewHandbook&utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_docs_sidebar"
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        window.gtag('event', 'levelsfyi.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Get paid, not played.</strong> Chat with former tech recruiters
        who’ll guide you on exactly what to say to negotiate a higher offer.
      </p>
    </a>
  );
});
