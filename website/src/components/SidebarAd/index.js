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

function TopResume({className}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://tidd.ly/3oezgOo"
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', 'topresume.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Best resume service for FAANG</strong>
        <br />
        If you are running low on time, I recommend TopResume's{' '}
        <u>free resume review</u> services, which has helped countless software
        engineers get interviews at FAANG.
      </p>
    </a>
  );
}

function AlgoMonster({className}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack="
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', 'algomonster.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Stop grinding and study with a plan! </strong>
        <br />
        Developed by Google engineers, <u>AlgoMonster</u> is the fastest way to
        get a software engineering job. <u>Join today for a 70% discount!</u>!
      </p>
    </a>
  );
}

function Moonchaser({className}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_docs_sidebar"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', 'moonchaser.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Get paid more.</strong> Receive risk-free salary negotiation
        advice from <u>Moonchaser</u>. You pay nothing unless your offer is
        increased. <u>Book a free consultation today!</u>
      </p>
    </a>
  );
}

function Educative({className}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://educative.io/tech-interview-handbook"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', 'educative.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Looking to get hired at FAANG?</strong>
        <br />
        <u>Educative</u> offers many great courses to improve your interview
        game. <u>Join today for a 10% discount!</u>
      </p>
    </a>
  );
}

function EducativeCoding({className}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://www.educative.io/courses/grokking-the-coding-interview?aff=x23W"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', 'educative.coding.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Get the job at FAANG</strong>
        <br />
        "Grokking the Coding Interview: Patterns for Coding Questions" by
        Educative is the best course for improving your algorithms interview
        game. <u>Join today for a 10% discount!</u>
      </p>
    </a>
  );
}

function EducativeSystemDesign({className}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://www.educative.io/courses/grokking-the-system-design-interview?aff=x23W"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', 'educative.coding.sidebar.click');
      }}>
      <p className={styles.tagline}>
        <strong>Get the job at FAANG</strong>
        <br />
        "Grokking the System Design Interview" by Educative is a highly
        recommended course for improving your system design interview game.{' '}
        <u>Join today for a 10% discount!</u>
      </p>
    </a>
  );
}

export default React.memo(function SidebarAd() {
  const backgroundClass =
    BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly>
      {() => {
        const path = window.location.pathname;
        // Ugly hack to show conditional sidebar content.

        if (path.includes('negotiation') || path.includes('compensation')) {
          return <Moonchaser className={backgroundClass} key={Math.random()} />;
        }

        if (
          path.includes('resume') ||
          path.includes('coding') ||
          path.includes('best-practice-questions') ||
          path.includes('cheatsheet') ||
          path.includes('mock-interviews') ||
          path.includes('algorithms')
        ) {
          return Math.random() > 0.5 ? (
            <AlgoMonster className={backgroundClass} key={Math.random()} />
          ) : (
            <EducativeCoding className={backgroundClass} key={Math.random()} />
          );
        }

        if (path.includes('system-design')) {
          return (
            <EducativeSystemDesign
              className={backgroundClass}
              key={Math.random()}
            />
          );
        }

        return Math.random() > 0.5 ? (
          <Moonchaser className={backgroundClass} key={Math.random()} />
        ) : (
          <Educative className={backgroundClass} key={Math.random()} />
        );
      }}
    </BrowserOnly>
  );
});
