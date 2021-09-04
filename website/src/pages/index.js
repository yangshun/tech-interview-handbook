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

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <img
            className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
            src={useBaseUrl('img/logo.svg')}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">
            {siteConfig.tagline} <br />
            Brought to you by the author of the{' '}
            <a href={BLIND_75_URL} target="_blank">
              Blind 75 List
            </a>
          </p>
          <div className={styles.buttons}>
            <a
              className={classnames('button button--primary button--lg')}
              href={useBaseUrl('introduction')}>
              Get Started&nbsp;&nbsp;→
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
              className={classnames(
                'margin-bottom--lg',
                'padding-vert--lg',
                styles.sectionPrimary,
              )}>
              <div className="container">
                <div className="row">
                  <div className="col col--8 col--offset-2">
                    <div className="margin-vert--lg text--center">
                      {Math.random() > 0.5 ? (
                        <div key={Math.random()}>
                          <h2 className={styles.sectionPrimaryTitle}>
                            <strong>
                              Get paid more. Receive risk-free salary
                              negotiation help from Moonchaser. You pay nothing
                              unless your offer is increased.
                            </strong>
                          </h2>
                          <div className="margin-vert--lg">
                            <a
                              className="button button--secondary button--lg"
                              href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_homepage"
                              rel="noreferrer noopener"
                              target="_blank"
                              onClick={() => {
                                window.gtag(
                                  'event',
                                  'moonchaser.homepage.click',
                                );
                              }}>
                              Get Risk-free Negotiation Help&nbsp;&nbsp;→
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div key={Math.random()}>
                          <h2 className={styles.sectionPrimaryTitle}>
                            <strong>
                              Get paid, not played. Chat with former tech
                              recruiters who'll guide you on exactly what to say
                              to negotiate a higher offer.
                            </strong>
                          </h2>
                          <div className="margin-vert--lg">
                            <a
                              className="button button--secondary button--lg"
                              href="https://www.levels.fyi/services/?ref=TechInterviewHandbook&utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_homepage"
                              rel="noreferrer noopener"
                              target="_blank"
                              onClick={() => {
                                window.gtag(
                                  'event',
                                  'levelsfyi.homepage.click',
                                );
                              }}>
                              Get Negotiation Help&nbsp;&nbsp;→
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </BrowserOnly>
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
                  Why Tech Interview Handbook?
                </h2>
                <div className="row margin-vert--lg">
                  <div className="col">
                    <h3>From Zero to Hero</h3>
                    <p>
                      Go from zero to tech interview hero with this handbook. No
                      prior interview experience needed.
                    </p>
                  </div>
                  <div className="col">
                    <h3>Curated Practice Questions</h3>
                    <p>
                      No one has time to practice a few hundred LeetCode
                      questions. We tell you which are the best questions to
                      practice. We created the{' '}
                      <a href={BLIND_75_URL} target="_blank">
                        Blind 75 List
                      </a>
                      .
                    </p>
                  </div>
                  <div className="col">
                    <h3>Interview Cheatsheet</h3>
                    <p>
                      Straight-to-the-point Do's and Don'ts during an interview.
                      Knowing these, the battle is already half won.
                    </p>
                  </div>
                </div>
                <div className="row margin-vert--lg">
                  <div className="col">
                    <h3>Practical Algorithm Tips</h3>
                    <p>
                      Practical tips for every algorithm topic - common
                      techniques and corner cases to look out for.
                    </p>
                  </div>
                  <div className="col">
                    <h3>Behavioral Questions</h3>
                    <p>
                      Check out what behavioral questions companies commonly ask
                      and you can prepare your answers ahead of time.
                    </p>
                  </div>
                  <div className="col">
                    <h3>Tested and Proven</h3>
                    <p>
                      Countless engineers have gotten their dream jobs with its
                      help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classnames(
            'margin-vert--lg',
            'padding-vert--lg',
            styles.sectionAlt,
          )}>
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
        <div
          className={classnames(
            'margin-vert--lg',
            'padding-vert--lg',
            'text--center',
          )}>
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
                    className="button button--primary button--lg"
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
      </div>
    </Layout>
  );
}

export default Home;
