import React, {useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import clsx from 'clsx';

import styles from './styles.module.css';

const AD_REFRESH_RATE = 20 * 1000;

const BACKGROUNDS = [
  styles.backgroundPurplin,
  styles.backgroundFirewatch,
  styles.backgroundLush,
  styles.backgroundSweetMorning,
  styles.backgroundViceCity,
  styles.backgroundRadar,
  styles.backgroundCosmicFusion,
  styles.backgroundAzurePop,
  styles.backgroundTranquil,
];

function FAANGTechLeads({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
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
        Save time crafting your resume with FAANG Tech Leads'{' '}
        <u>FAANG-quality resume templates and examples</u> which have helped
        many Software Engineers get interviews at top Bay Area companies. Grab
        them now for a <u>whopping 70% off</u>!
      </p>
    </a>
  );
}

function AlgoMonster({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack="
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `algomonster.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Stop grinding. Study with a plan
        </strong>
        Developed by Google engineers, <u>AlgoMonster</u> is the fastest way to
        get a software engineering job. <u>Join today for a 70% discount!</u>
      </p>
    </a>
  );
}

function Moonchaser({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href={`https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}`}
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `moonchaser.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>Get paid more.</strong> Receive
        risk-free salary negotiation advice from <u>Moonchaser</u>. You pay
        nothing unless your offer is increased.{' '}
        <u>Book a free consultation today!</u>
      </p>
    </a>
  );
}

function EducativeCoding({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href={`https://www.educative.io/courses/grokking-the-coding-interview?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=x23W`}
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `educative.coding.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>Get the job at FAANG</strong>
        <u>Grokking the Coding Interview</u> teaches you techniques and question
        patterns to be good at coding interviews.{' '}
        <u>Get your 10% discount now!</u>
      </p>
    </a>
  );
}

function EducativeSystemDesign({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href={`https://www.educative.io/courses/grokking-the-system-design-interview?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=x23W`}
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `educative.system_design.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>Get the job at FAANG</strong>
        <u>Grokking the System Design Interview</u> is a highly recommended
        course to get better at system design interviews.{' '}
        <u>Join today for a 10% discount!</u>
      </p>
    </a>
  );
}

export default React.memo(function SidebarAd({position}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter((counter) => counter + 1);
    }, AD_REFRESH_RATE);

    return () => clearTimeout(timer);
  }, [counter]);

  const backgroundClass =
    BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly key={counter}>
      {() => {
        const path = window.location.pathname;
        // Ugly hack to show conditional sidebar content.

        if (path.includes('resume')) {
          return (
            <FAANGTechLeads
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          );
        }

        if (path.includes('negotiation') || path.includes('compensation')) {
          return (
            <Moonchaser
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          );
        }

        if (
          path.includes('coding') ||
          path.includes('best-practice-questions') ||
          path.includes('cheatsheet') ||
          path.includes('mock-interviews') ||
          path.includes('algorithms')
        ) {
          return Math.random() > 0.5 ? (
            <AlgoMonster
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          ) : (
            <EducativeCoding
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          );
        }

        if (path.includes('system-design')) {
          return (
            <EducativeSystemDesign
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          );
        }

        return Math.random() > 0.5 ? (
          <AlgoMonster
            className={backgroundClass}
            key={Math.random()}
            position={position}
          />
        ) : (
          <EducativeCoding
            className={backgroundClass}
            key={Math.random()}
            position={position}
          />
        );
      }}
    </BrowserOnly>
  );
});
