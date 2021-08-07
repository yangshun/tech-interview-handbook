import React from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import styles from './styles.module.css';

export default function SidebarAd() {
  return (
    <a
      className={styles.container}
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
}
