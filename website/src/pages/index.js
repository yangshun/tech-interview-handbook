import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import successStories from '../data/successStories';

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
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--primary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('introduction')}>
              Get Started&nbsp;&nbsp;→
            </Link>
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
      <main>
        <div className={styles.sectionDark}>
          <div className="container padding-vert--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="margin-vert--lg text--center">
                  <h2 className={styles.sectionDarkTitle}>
                    Job hunting? Sign up with Triplebyte to efficiently
                    interview with top tech companies and land your dream job!
                    💰
                  </h2>
                  <div className="margin-vert--lg">
                    <a
                      className="button button--secondary button--lg"
                      href="https://triplebyte.com/a/PJaJNpO/tihw"
                      rel="noreferrer noopener"
                      target="_blank">
                      Sign up for free!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="padding-vert--xl">
          <p className="container">
            <p className="row">
              <p className="col col--10 col--offset-1">
                <h2 className="text--center  margin-bottom--xl">
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
                      No one has time to practice a few hundred Leetcode
                      questions. We tell you which are the best questions to
                      practice.
                    </p>
                  </div>
                  <div className="col">
                    <h3>Interview Cheatsheet</h3>
                    <p>
                      Straight-to-the-point Do's and Don'ts during an interview
                    </p>
                  </div>
                </div>
                <p className="row margin-vert--lg">
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
                  <p className="col">
                    <h3>Tested and Proven</h3>
                    <p>
                      Countless engineers have gotten their dream jobs with its
                      help.
                    </p>
                  </p>
                </p>
              </p>
            </p>
          </p>
        </p>
        <div className={styles.sectionAlt}>
          <div className="container padding-vert--xl">
            <div className="row">
              <div className="col col--6 col--offset-3">
                <div className="margin-vert--lg text--center">
                  <h2>Success Stories</h2>
                </div>
                {successStories.map(user => (
                  <div className="card margin-vert--lg" key={user.name}>
                    <div className="card__header">
                      <div className="avatar">
                        <img className="avatar__photo" src={user.thumbnail} />
                        <div className="avatar__intro">
                          <h4 className="avatar__name">{user.name}</h4>
                          <small className="avatar__subtitle">
                            {user.title}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card__body">
                      <blockquote>"{user.quote}"</blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
