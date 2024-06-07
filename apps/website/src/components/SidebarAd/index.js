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

function TIHResumeReview({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundTIH)}
      href={`https://app.techinterviewhandbook.org/resumes?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=1e80c401fe7e2`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `tih.resume_review.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Get your resume reviewed for free
        </strong>
        Try out our free new <u>community-powered resume review portal</u>.
        Upload a resume, receive helpful comments and feedback from community
        members.
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

function AlgoMonster({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundAlgoMonster)}
      href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack="
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `algomonster.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Stop grinding mindlessly. Study with a plan
        </strong>
        Developed by Google engineers, <u>AlgoMonster</u> is the fastest way to
        get a software engineering job. <u>Check it out for free!</u>
      </p>
    </a>
  );
}

function DesignGurusSystemDesign({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundGrokkingSystemDesign)}
      href="https://designgurus.org/link/kJSIoU?url=https%3A%2F%2Fdesigngurus.org%2Fcourse%3Fcourseid%3Dgrokking-the-system-design-interview"
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
          return rand < 0.67 ? (
            <TIHResumeReview key={Math.random()} position={position} />
          ) : (
            <FAANGTechLeads key={Math.random()} position={position} />
          );
        }

        if (path.includes('system-design')) {
          return rand < 0.5 ? (
            <ByteByteGoSystemDesign key={Math.random()} position={position} />
          ) : (
            <DesignGurusSystemDesign key={Math.random()} position={position} />
          );
        }

        // if (
        //   path.includes('coding') ||
        //   path.includes('best-practice-questions') ||
        //   path.includes('mock-interviews') ||
        //   path.includes('algorithms')
        // ) {
        //   return rand < 0.3 ? (
        //     <Interviewingio key={Math.random()} position={position} />
        //   ) : rand < 0.6 ? (
        //     <AlgoMonster key={Math.random()} position={position} />
        //   ) : (
        //     <DesignGurusCoding key={Math.random()} position={position} />
        //   );
        // }

        return rand < 0.5 ? (
          <FAANGTechLeads key={Math.random()} position={position} />
        ) : (
          <GreatFrontEnd key={Math.random()} position={position} />
        );
      }}
    </BrowserOnly>
  );
});
