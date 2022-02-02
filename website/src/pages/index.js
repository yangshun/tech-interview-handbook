import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import successStories from '../data/successStories';

const BLIND_75_URL =
  'https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU';

const FEATURES = [
  {
    title: <>💯 Go From zero to hero</>,
    description: (
      <>
        Go from zero to tech interview hero with this handbook. No prior
        interview experience needed.
      </>
    ),
    link: '/introduction',
  },
  {
    title: <>📝 Curated practice questions</>,
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
    title: <>📋 Interview cheatsheet</>,
    description: (
      <>
        Straight-to-the-point Do's and Don'ts during an interview. The battle is
        already half won.
      </>
    ),
    link: '/cheatsheet',
  },
  {
    title: <>💁‍♀️ Practical algorithm tips</>,
    description: (
      <>
        Practical tips for every algorithm topic - common techniques and corner
        cases to look out for.
      </>
    ),
    link: '/algorithms/introduction',
  },
  {
    title: <>💬 Behavioral questions</>,
    description: (
      <>
        Check out what behavioral questions companies commonly ask and you can
        prepare your answers ahead of time.
      </>
    ),
    link: '/behavioral-questions',
  },
  {
    title: <>🧪 Tested and proven</>,
    description: (
      <>
        Countless engineers have gotten their dream jobs with the help of Tech
        Interview Handbook.
      </>
    ),
  },
];

function Tweet({url, handle, name, content, avatar, date}) {
  return (
    <div className={classnames('card', styles.tweet)}>
      <div className="card__header">
        <div className="avatar">
          <img alt={name} className="avatar__photo" src={avatar} />
          <div className="avatar__intro">
            <div className={styles.tweet}>
              <strong>{name}</strong>{' '}
              <span className={styles.tweetMeta}>
                @{handle} &middot;{' '}
                <a className={styles.tweetMeta} href={url} rel="noopener">
                  {date}
                </a>
              </span>
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const {siteConfig = {}} = useDocusaurusContext();
  return (
    <Layout
      title="Technical Interview Guide for Busy Engineers"
      description={siteConfig.tagline}>
      <HeroSection />
      <EducativeSection />
      <ProductContentsSection />
      <FeaturesSection />
      <MoonchaserSection />
      <TweetsSection />
      <SuccessStoriesSection />
      <SponsorshipSection />
      <PreFooterSection />
    </Layout>
  );
}

function HeroSection() {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <header className={classnames('hero', styles.heroBanner)}>
      <div className="container">
        <img
          alt={siteConfig.title}
          className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
          src={useBaseUrl('img/logo.svg')}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">
          {siteConfig.tagline} <br />
          Brought to you by FAANG engineers and the author of the{' '}
          <a href={BLIND_75_URL} rel="noopener" target="_blank">
            Blind 75 list
          </a>
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
  );
}

function MoonchaserSection() {
  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly>
      {() => (
        <div className={classnames('padding-vert--lg', styles.sectionSponsor)}>
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
                        rel="noopener"
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
  );
}

function ProductContentsSection() {
  return (
    <div className={classnames('padding-vert--xl')}>
      <div className="container">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h2
              className={classnames(
                'text--center',
                'margin-bottom--xl',
                styles.sectionTitle,
              )}>
              Complete guide to getting software engineering jobs at top firms
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
                    <a href={useBaseUrl('resume')}>Resume preparation</a>
                  </li>
                  <li>
                    <a href={useBaseUrl('resume-case-study')}>
                      Resume case studies and samples
                    </a>
                  </li>
                  <li>
                    <a href={useBaseUrl('interview-formats')}>
                      Interview formats
                    </a>
                  </li>
                  <li>
                    <a href={useBaseUrl('best-practice-questions')}>
                      Best practice questions
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
                    <a href={useBaseUrl('coding-interview')}>Coding</a>
                  </li>
                  <li>
                    <a href={useBaseUrl('algorithms/introduction')}>
                      Algorithms
                    </a>
                  </li>
                  <li>
                    <a href={useBaseUrl('system-design')}>System design</a>
                  </li>
                  <li>
                    <a href={useBaseUrl('behavioral-interview')}>Behavioral</a>
                  </li>
                  <li>
                    <a
                      href="https://frontendinterviewhandbook.com"
                      rel="noopener">
                      Front end
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
                <h3>Algorithms deep-dive</h3>
                <ul>
                  <li>
                    <a href={useBaseUrl('algorithms/array')}>Array</a>
                  </li>
                  <li>
                    <a href={useBaseUrl('algorithms/graph')}>Graph</a>
                  </li>
                  <li>
                    <a href={useBaseUrl('algorithms/linked-list')}>
                      Linked list
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
  );
}

function FeaturesSection() {
  return (
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
              There's everything you need
            </h2>
            <div className={classnames('row', styles.featuresRow)}>
              {FEATURES.map(({title, description, link}) => (
                <div
                  className={classnames(
                    'col',
                    'col--4',
                    styles.featuresRowItemContainer,
                  )}>
                  <div className={'card ' + styles.featuresRowItem}>
                    <h3 className={styles.featuresRowItemTitle}>{title}</h3>
                    <p className={styles.featuresRowItemDescription}>
                      {description}
                    </p>
                    {link && (
                      <a
                        className={styles.featuresRowItemLink}
                        href={useBaseUrl(link)}>
                        <strong>Start reading →</strong>
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
  );
}

function EducativeSection() {
  return (
    <div className={classnames('padding-vert--lg', styles.sectionSponsorAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="margin-vert--lg text--center">
              <div>
                <h2 className={styles.sectionSponsorTitle}>
                  <strong>
                    Looking to get hired at FAANG? Educative offers a ton of
                    great courses to improve your interview game. Join today for
                    a 10% discount!
                  </strong>
                </h2>
                <div className="margin-vert--lg">
                  <a
                    className="button button--secondary button--lg"
                    href="https://www.educative.io/explore?search_string=interview&aff=x23W"
                    rel="noopener"
                    target="_blank"
                    onClick={() => {
                      window.gtag('event', 'educative.homepage.click');
                    }}>
                    Check out courses&nbsp;&nbsp;→
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TweetsSection() {
  return (
    <div className={classnames('padding-vert--lg', styles.sectionAlt)}>
      <div className="container">
        <h2
          className={classnames(
            'margin-vert--lg',
            'text--center',
            styles.sectionTitle,
          )}>
          Over 500,000 people have benefitted from this handbook!
        </h2>
        <div className={classnames('row', styles.tweetsSection)}>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/Insharamin/status/1412978510788915205"
              handle="Insharamin"
              name="Insha"
              date="Jul 8, 2021"
              avatar="https://pbs.twimg.com/profile_images/1468474545891774464/jENKPsRG_400x400.jpg"
              content={
                <>
                  1️⃣ Tech Interview Handbook
                  <br />
                  <br />
                  This repository has practical content that covers all phases
                  of a technical interview, from applying for a job to passing
                  the interviews to offer negotiation. 📎
                </>
              }
            />
            <Tweet
              url="https://twitter.com/Justyna_Adam/status/1186166253830004736"
              handle="Justyna_Adam"
              name="Justyna_Adamczyk"
              date="Oct 21, 2019"
              avatar="https://pbs.twimg.com/profile_images/1328613502571978753/bTkdJhPt_400x400.jpg"
              content={
                <>
                  Another excellent tech interview handbook! If you need to
                  prepare yourself for a tech interview or you're an interviewer
                  and need additional inspiration. Happy Monday! #techinterviews
                </>
              }
            />
            <Tweet
              url="https://twitter.com/umaar/status/913425809108606976"
              handle="umaar"
              name="Umar Hansa"
              date="Sep 28, 2017"
              avatar="https://pbs.twimg.com/profile_images/1305935669705965568/vS_bpIuu_400x400.jpg"
              content={
                <>
                  Tech Interview Handbook 💻 - Content to help you ace your next
                  technical interview. Lots of front-end content here ✅
                </>
              }
            />
          </div>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/palashv2/status/1452981345899085833"
              handle="palashv2"
              name="Palash"
              date="Oct 26, 2021"
              avatar="https://pbs.twimg.com/profile_images/1435103134842454016/DfF093MF_400x400.jpg"
              content={
                <>
                  5. Tech Interview Handbook
                  <br />
                  <br />
                  Here's free and curated technical interview preparation
                  materials for busy engineers. Besides the usual algorithm
                  questions, other awesome stuff includes How to prepare for
                  coding interviews, Interview Cheatsheet, and more.
                </>
              }
            />
            <Tweet
              url="https://twitter.com/ravinwashere/status/1328381097277681665"
              handle="ravinwashere"
              name="Ravin"
              date="Nov 17, 2020"
              avatar="https://pbs.twimg.com/profile_images/1314872679195799552/80_xRIEF_400x400.jpg"
              content={
                <>
                  Preparing for a job interview?
                  <br />
                  <br />
                  The tech interview handbook contains carefully curated to help
                  you ace your next technical interview.
                  <br />
                  <br />
                  And it's free.
                </>
              }
            />
            <Tweet
              url="https://twitter.com/rwenderlich/status/1166336060533727232"
              handle="rwenderlich"
              name="raywenderlich.com"
              date="Aug 27, 2019"
              avatar="https://pbs.twimg.com/profile_images/1445056225478021122/2jTrV6Fi_400x400.jpg"
              content={<>Nice open source tech interview handbook</>}
            />
          </div>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/khalalw/status/1469496702365159431"
              handle="khalalw"
              name="Khalal Walker"
              date="Dec 11, 2021"
              avatar="https://pbs.twimg.com/profile_images/1479884864543285255/pcE_Nl12_400x400.jpg"
              content={
                <>
                  Lastly, the Tech Interview Handbook. This is a pretty solid
                  comprehensive resource from your initial introduction, to
                  resumes, system design, coding, etc. Points to other solid
                  resources that can be a great help.
                </>
              }
            />
            <Tweet
              url="https://twitter.com/Vinaystwt/status/1437062973554507777"
              handle="Vinaystwt"
              name="Vinay Sharma"
              date="Sep 12, 2021"
              avatar="https://pbs.twimg.com/profile_images/1413766958281990145/--os1eLq_400x400.jpg"
              content={
                <>
                  🔹Tech Interview Handbook: Another useful resource that covers
                  information about technical interviews. It covers the job
                  applications, the interview process and the post-interview
                </>
              }
            />
            <Tweet
              url="https://twitter.com/sitepointdotcom/status/1164121717243023360"
              handle="sitepointdotcom"
              name="SitePoint"
              date="Aug 21, 2019"
              avatar="https://pbs.twimg.com/profile_images/1425900902783668228/eJF_2-Ds_400x400.jpg"
              content={
                <>
                  The Tech Interview Handbook provides carefully curated content
                  to help you ace your next technical interview.
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessStoriesSection() {
  return (
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
              Success stories
            </h2>
            {successStories.map((user) => (
              <div className="card margin-vert--lg" key={user.name}>
                <div className="card__body">
                  <p className={styles.quote}>"{user.quote}"</p>
                </div>
                <div className="card__header">
                  <div className="avatar">
                    <img
                      alt={user.name}
                      className="avatar__photo"
                      src={user.thumbnail}
                    />
                    <div className="avatar__intro">
                      <div className="avatar__name">{user.name}</div>
                      <small className="avatar__subtitle">{user.title}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="margin-vert--lg text--center">
              Would you like to contribute a success story?{' '}
              <a
                href="https://github.com/yangshun/tech-interview-handbook/edit/master/website/src/data/successStories.js"
                rel="noopener"
                target="_blank">
                Open a Pull Request here
              </a>
              !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorshipSection() {
  return (
    <div className={classnames('padding-vert--lg', 'text--center')}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h2 className={classnames('margin-vert--lg', styles.sectionTitle)}>
              Enjoying Tech Interview Handbook so far?
            </h2>
            <p className={classnames(styles.sectionTagline)}>
              Support this project by becoming a sponsor! Your logo/profile
              picture will show up here with a link to your website.
            </p>
            <div>
              <a
                href="https://opencollective.com/tech-interview-handbook/sponsor/0/website"
                rel="noopener"
                target="_blank">
                <img
                  alt="Sponsor"
                  src="https://opencollective.com/tech-interview-handbook/sponsor/0/avatar.svg"
                />
              </a>
              <a
                href="https://opencollective.com/tech-interview-handbook/sponsor/1/website"
                rel="noopener"
                target="_blank">
                <img
                  alt="Sponsor"
                  src="https://opencollective.com/tech-interview-handbook/sponsor/1/avatar.svg"
                />
              </a>
            </div>
            <div className="margin-vert--lg">
              <a
                className="button button--secondary button--lg"
                href="https://opencollective.com/tech-interview-handbook"
                rel="noopener"
                target="_blank">
                Become a sponsor!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreFooterSection() {
  return (
    <div className={classnames('padding-vert--xl', styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <h2>Take the next step</h2>
          </div>
          <div className="col col--8">
            <p className={classnames(styles.sectionTagline)}>
              It's free! Start improving your interview game today and get the
              job at the company of your dreams.
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
  );
}

export default Home;
