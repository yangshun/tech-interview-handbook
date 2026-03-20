import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import clsx from 'clsx';

import styles from './styles.module.css';

const AD_REFRESH_RATE = 20 * 1000;

function FAANGTechLeads({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundFTL)}
      href={`https://www.faangtechleads.com?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=1e80c401fe7e2`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `faangtechleads.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Craft the perfect resume for FAANG
        </strong>
        Save time crafting your resume with{' '}
        <u>FAANG-quality resume templates and examples</u> which have helped
        many Software Engineers get interviews at top Bay Area companies!
      </p>
    </a>
  );
}

function GreatFrontEnd({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundGreatFrontEnd)}
      href={`https://www.greatfrontend.com?fpr=yangshun&utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `greatfrontend.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>LeetCode for Front End</strong>
        Built by ex-FAANG Senior Engineers, <u>GreatFrontEnd</u> is the fastest
        way to prepare for a Front End interview.
      </p>
    </a>
  );
}

function DesignGurusSystemDesign({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundGrokkingSystemDesign)}
      href="https://www.designgurus.io/course/grokking-the-system-design-interview?aff=kJSIoU"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `designgurus.system_design.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>Get the job at FAANG</strong>
        <u>Grokking the System Design Interview</u> is a highly recommended
        course to get better at system design interviews. <u>Find out more!</u>
      </p>
    </a>
  );
}

function ByteByteGoSystemDesign({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundByteByteGo)}
      href="https://bytebytego.com?fpr=techinterviewhandbook"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `bytebytego.system_design.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Ace Your Next System Design Interview
        </strong>
        <u>ByteByteGo's</u> system design interview course is everything you
        need to take your system design skill to the next level.{' '}
        <u>Find out more!</u>
      </p>
    </a>
  );
}

export default React.memo(function SidebarAd({ position }) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter((counter) => counter + 1);
    }, AD_REFRESH_RATE);

    return () => clearTimeout(timer);
  }, [counter]);

  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly key={counter}>
      {() => {
        const rand = Math.random();
        const path = window.location.pathname;

        // Ugly hack to show conditional sidebar content.
        if (
          (path.includes('software-engineering-interview-guide') ||
            path.includes('coding-interview-prep')) &&
          position === 'in_doc'
        ) {
          return <GreatFrontEnd key={Math.random()} position={position} />;
        }

        if (path.includes('resume')) {
          return <FAANGTechLeads key={Math.random()} position={position} />;
        }

        if (path.includes('system-design')) {
          return rand < 0.5 ? (
            <ByteByteGoSystemDesign key={Math.random()} position={position} />
          ) : (
            <DesignGurusSystemDesign key={Math.random()} position={position} />
          );
        }

        return rand < 0.5 ? (
          <FAANGTechLeads key={Math.random()} position={position} />
        ) : (
          <GreatFrontEnd key={Math.random()} position={position} />
        );
      }}
    </BrowserOnly>
  );
});
