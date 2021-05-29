import React from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import styles from './styles.module.css';

const AD_ELEMENT_ID = 'ad-element-id';
const CONTAINER_SELECTOR = '[class^="tableOfContents"]';

function SidebarAd() {
  return (
    <a
      className={styles.container}
      href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_docs_sidebar"
      target="_blank"
      rel="noreferrer noopener">
      <p className={styles.tagline}>
        <strong>Get paid more.</strong> Receive risk-free salary negotiation
        help from Moonchaser. You pay nothing unless your offer is increased.
      </p>
    </a>
  );
}

function initAd() {
  const $adEl = (() => {
    const $el = document.getElementById(AD_ELEMENT_ID);
    if ($el) {
      return $el;
    }

    const $tocEl = document.querySelector(CONTAINER_SELECTOR);
    if ($tocEl == null) {
      return null;
    }

    const $newEl = document.createElement('div');
    $newEl.id = AD_ELEMENT_ID;
    $tocEl.prepend($newEl);

    return $newEl;
  })();

  if ($adEl == null) {
    return;
  }

  ReactDOM.render(<SidebarAd />, $adEl);
}

if (ExecutionEnvironment.canUseDOM) {
  window.onload = initAd;
}

export default (function (context, options) {
  return {
    name: 'sidebar-ad',
    onRouteUpdate() {
      // Render only after the page renders.
      setTimeout(() => {
        initAd();
      }, 0);
    },
  };
})();
