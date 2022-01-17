import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import successStories from '../data/successStories';

const BLIND_75_URL =
  'https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU';

const FEATURES = [
  {
    title: <>💯 Go From Zero to Hero</>,
    description: (
      <>
        Go from zero to tech interview hero with this handbook. No prior
        interview experience needed.
      </>
    ),
    link: '/introduction',
  },
  {
    title: <>📝 Curated Practice Questions</>,
    description: (
      <>
        No one has time to practice a few hundred questions. We created the{' '}
        <a href={BLIND_75_URL} target="_blank">
          Blind 75 List
        </a>{' '}
        to tell you which the best questions are.
      </>
    ),
    link: '/best-practice-questions',
  },
  {
    title: <>📋 Interview Cheatsheet</>,
    description: (
      <>
        Straight-to-the-point Do's and Don'ts during an interview. The battle is
        already half won.
      </>
    ),
    link: '/cheatsheet',
  },
  {
    title: <>💁‍♀️ Practical Algorithm Tips</>,
    description: (
      <>
        Practical tips for every algorithm topic - common techniques and corner
        cases to look out for.
      </>
    ),
    link: '/algorithms/introduction',
  },
  {
    title: <>💬 Behavioral Questions</>,
    description: (
      <>
        Check out what behavioral questions companies commonly ask and you can
        prepare your answers ahead of time.
      </>
    ),
    link: '/behavioral-questions',
  },
  {
    title: <>🧪 Tested and Proven</>,
    description: (
      <>
        Countless engineers have gotten their dream jobs with the help of Tech
        Interview Handbook.
      </>
    ),
  },
];

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Technical Interview Guide for Busy Engineers"
      description={siteConfig.tagline}>
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <img
            className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
            src={useBaseUrl('img/logo.svg')}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">
            {siteConfig.tagline} <br />
            Brought to you by FAANG engineers and the author of the{' '}
            <a href={BLIND_75_URL} target="_blank">
              Blind 75 List
            </a>
            <br />
            Over 500,000 people have benefitted from this handbook!
          </p>
          <div className={styles.buttons}>
            <a
              className={classnames('button button--primary button--lg')}
              href={useBaseUrl('introduction')}>
              Start reading now&nbsp;&nbsp;→
            </a>
          </div>
          <div className="margin-top--lg">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=yangshun&amp;repo=tech-interview-handbook&amp;type=star&amp;count=true&amp;size=large"
              frameBorder={0}
              scrolling={0}
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </div>
        </div>
      </header>
      <div>
        {/* // Because the SSR and client output can differ and hydration doesn't patch attribute differences, 
        we'll render this on the browser only. */}
        <BrowserOnly>
          {() => (
            <div
              className={classnames('padding-vert--lg', styles.sectionSponsor)}>
              <div className="container">
                <div className="row">
                  <div className="col col--8 col--offset-2">
                    <div className="margin-vert--lg text--center">
                      <div>
                        <h2 className={styles.sectionSponsorTitle}>
                          <strong>
                            Get paid more. Receive risk-free salary negotiation
                            advice from Moonchaser. You pay nothing unless your
                            offer is increased.
                          </strong>
                        </h2>
                        <div className="margin-vert--lg">
                          <a
                            className="button button--secondary button--lg"
                            href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_homepage"
                            rel="noreferrer noopener"
                            target="_blank"
                            onClick={() => {
                              window.gtag('event', 'moonchaser.homepage.click');
                            }}>
                            Get risk-free negotiation advice&nbsp;&nbsp;→
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </BrowserOnly>
        <div className={classnames('padding-vert--xl', styles.sectionAlt)}>
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <h2
                  className={classnames(
                    'text--center',
                    'margin-bottom--xl',
                    styles.sectionTitle,
                  )}>
                  Complete guide to getting software engineering jobs at top
                  firms
                </h2>
                <div className={classnames('row', styles.featuresRow)}>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItemContainer,
                    )}>
                    <h3>Not sure where to start? We got you covered</h3>
                    <ul>
                      <li>
                        <a href={useBaseUrl('resume')}>Resume Preparation</a>
                      </li>
                      <li>
                        <a href={useBaseUrl('resume-case-study')}>
                          Resume Samples
                        </a>
                      </li>
                      <li>
                        <a href={useBaseUrl('interview-formats')}>
                          Interview Formats
                        </a>
                      </li>
                      <li>
                        <a href={useBaseUrl('best-practice-questions')}>
                          Best Practice Questions
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItemContainer,
                    )}>
                    <h3>Efficiently prepare for all kinds of interviews</h3>
                    <ul>
                      <li>
                        <a href={useBaseUrl('algorithms/introduction')}>
                          Algorithms
                        </a>
                      </li>
                      <li>
                        <a href={useBaseUrl('system-design')}>System Design</a>
                      </li>
                      <li>
                        <a href={useBaseUrl('behavioral-round-overview')}>
                          Behavioral
                        </a>
                      </li>
                      <li>
                        <a href="https://frontendinterviewhandbook.com">
                          Front End
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItemContainer,
                    )}>
                    <h3>Algorithms Deep-dive</h3>
                    <ul>
                      <li>
                        <a href={useBaseUrl('algorithms/array')}>Array</a>
                      </li>
                      <li>
                        <a href={useBaseUrl('algorithms/graph')}>Graph</a>
                      </li>
                      <li>
                        <a href={useBaseUrl('algorithms/linked-list')}>
                          Linked List
                        </a>
                      </li>
                      <li>
                        <a href={useBaseUrl('algorithms/introduction')}>
                          and more...
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames('margin-vert--lg', 'padding-vert--lg')}>
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <h2
                  className={classnames(
                    'text--center',
                    'margin-bottom--xl',
                    styles.sectionTitle,
                  )}>
                  What is inside?
                </h2>
                <div className={classnames('row', styles.featuresRow)}>
                  {FEATURES.map(({title, description, link}) => (
                    <div
                      className={classnames(
                        'col',
                        'col--4',
                        styles.featuresRowItemContainer,
                      )}>
                      <div className={styles.featuresRowItem}>
                        <h3 className={styles.featuresRowItemTitle}>{title}</h3>
                        <p className={styles.featuresRowItemDescription}>
                          {description}
                        </p>
                        {link && (
                          <a
                            className={styles.featuresRowItemLink}
                            href={useBaseUrl(link)}>
                            <strong>Learn more</strong>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classnames('padding-vert--lg', styles.sectionSponsorAlt)}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="margin-vert--lg text--center">
                  <div>
                    <h2 className={styles.sectionSponsorTitle}>
                      <strong>
                        Looking for high quality interview courses? Educative
                        offers a ton of great courses to improve your interview
                        game.
                      </strong>
                    </h2>
                    <div className="margin-vert--lg">
                      <a
                        className="button button--secondary button--lg"
                        href="https://www.educative.io/explore?search_string=interview&aff=x23W"
                        rel="noreferrer noopener"
                        target="_blank"
                        onClick={() => {
                          window.gtag('event', 'educative.homepage.click');
                        }}>
                        Get started&nbsp;&nbsp;→
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames('padding-vert--lg', styles.sectionAlt)}>
          <div className="container">
            <div className="row">
              <div className="col col--6 col--offset-3">
                <h2
                  className={classnames(
                    'margin-vert--lg',
                    'text--center',
                    styles.sectionTitle,
                  )}>
                  Success Stories
                </h2>
                {successStories.map((user) => (
                  <div className="card margin-vert--lg" key={user.name}>
                    <div className="card__body">
                      <p className={styles.quote}>"{user.quote}"</p>
                    </div>
                    <div className="card__header">
                      <div className="avatar">
                        <img className="avatar__photo" src={user.thumbnail} />
                        <div className="avatar__intro">
                          <div className="avatar__name">{user.name}</div>
                          <small className="avatar__subtitle">
                            {user.title}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="margin-vert--lg text--center">
                  Would you like to contribute a success story?{' '}
                  <a
                    href="https://github.com/yangshun/tech-interview-handbook/edit/master/website/src/data/successStories.js"
                    target="_blank">
                    Open a Pull Request here
                  </a>
                  !
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames('padding-vert--lg', 'text--center')}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2
                  className={classnames(
                    'margin-vert--lg',
                    styles.sectionTitle,
                  )}>
                  Enjoying Tech Interview Handbook so far?
                </h2>
                <p className={classnames(styles.sectionTagline)}>
                  Support this project by becoming a sponsor! Your logo/profile
                  picture will show up here with a link to your website.
                </p>
                <div>
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/0/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/0/avatar.svg" />
                  </a>
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/1/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/1/avatar.svg" />
                  </a>
                </div>
                <div className="margin-vert--lg">
                  <a
                    className="button button--secondary button--lg"
                    href="https://opencollective.com/tech-interview-handbook"
                    rel="noreferrer noopener"
                    target="_blank">
                    Become a sponsor!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames('padding-vert--xl', styles.sectionAlt)}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <h2>Take the next step</h2>
              </div>
              <div className="col col--8">
                <p className={classnames(styles.sectionTagline)}>
                  It's free! Start improving your interview game today and get
                  the job at the company of your dreams.
                </p>
                <a
                  className={classnames('button button--primary button--lg')}
                  href={useBaseUrl('introduction')}>
                  Start reading now&nbsp;&nbsp;→
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
