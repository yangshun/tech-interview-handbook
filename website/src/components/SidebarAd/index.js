import React from 'react';
import ReactDOM from 'react-dom';
import BrowserOnly from '@docusaurus/BrowserOnly';

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

  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly>
      {() =>
        Math.random() > 0.5 ? (
          <a
            className={clsx(styles.container, backgroundClass)}
            href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_docs_sidebar"
            key={Math.random()}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              window.gtag('event', 'moonchaser.sidebar.click');
            }}>
            <p className={styles.tagline}>
              <strong>Get paid more.</strong> Receive risk-free salary
              negotiation advice from Moonchaser. You pay nothing unless your
              offer is increased.
            </p>
          </a>
        ) : (
          <a
            className={clsx(styles.container, backgroundClass)}
            href="https://educative.io/tech-interview-handbook"
            key={Math.random()}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              window.gtag('event', 'educative.sidebar.click');
            }}>
            <p className={styles.tagline}>
              <strong>Level up with Educative.</strong> Get 10% off Educative's
              wide range of interview courses today!
            </p>
          </a>
        )
      }
    </BrowserOnly>
  );
});
