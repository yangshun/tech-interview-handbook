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
        many Software Engineers get interviews at top Bay Area companies!
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
          Stop grinding LeetCode. Study with a plan
        </strong>
        Developed by Google engineers, <u>AlgoMonster</u> is the fastest way to
        get a software engineering job. <u>Check it out for free!</u>
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
        <u>Book your free consultation today!</u>
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
        <strong className={styles.title}>
          Get better at Coding Interviews
        </strong>
        <u>Grokking the Coding Interview</u> teaches you techniques and question
        patterns to be good at coding interviews. Grab your limited time
        discount today!
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
        course to get better at system design interviews. <u>Find out more!</u>
      </p>
    </a>
  );
}

function Interviewingio({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://iio.sh/r/DMCa"
      key={Math.random()}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `interviewingio.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Practice interviewing with Google engineers
        </strong>
        interviewing.io provides anonymous technical mock interviews with
        engineers from Google, Facebook, and other top companies.{' '}
        <u>Give it a try!</u>
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
        const rand = Math.random();

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
          path.includes('mock-interviews') ||
          path.includes('algorithms')
        ) {
          return rand < 0.3 ? (
            <Interviewingio
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          ) : rand < 0.6 ? (
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

        return rand < 0.25 ? (
          <FAANGTechLeads
            className={backgroundClass}
            key={Math.random()}
            position={position}
          />
        ) : rand < 0.5 ? (
          <Interviewingio
            className={backgroundClass}
            key={Math.random()}
            position={position}
          />
        ) : rand < 0.75 ? (
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
