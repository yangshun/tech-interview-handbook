import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import withBaseUrl from '@docusaurus/withBaseUrl';
import styles from './styles.module.css';

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <img
            className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
            src={withBaseUrl('img/logo.svg')}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--primary button--lg',
                styles.getStarted,
              )}
              to={withBaseUrl('introduction')}>
              Get Started&nbsp;&nbsp;→
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--10 col--offset-1">
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
              <div className="row margin-vert--lg">
                <div className="col">
                  <h3>Practical Algorithm Tips</h3>
                  <p>
                    Practical tips for every algorithm topic - common techniques
                    and corner cases to look out for.
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
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="margin-vert--lg text--center">
                <h2>Many Success Stories</h2>
              </div>
              <div class="card margin-vert--lg">
                <div class="card__header">
                  <div class="avatar">
                    <img
                      class="avatar__photo"
                      src="https://avatars1.githubusercontent.com/u/1315101?s=460&v=4"
                    />
                    <div class="avatar__intro">
                      <h4 class="avatar__name">Yangshun Tay</h4>
                      <small class="avatar__subtitle">
                        Front End Engineer, Facebook
                      </small>
                    </div>
                  </div>
                </div>
                <div class="card__body">
                  <blockquote>
                    "My job hunt was successful beyond my expectations thanks to
                    this wonderful resource. Huge thanks to the author for
                    sharing their knowledge!"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
