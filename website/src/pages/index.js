import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import successStories from '../data/successStories';

const BLIND_75_URL =
  'https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU';
const BLIND_OFFER_NUMBERS_URL =
  'https://www.teamblind.com/post/Sharing-my-offer-numbers-from-big-companies-for-your-reference-yNgqUPQR';

const FEATURES = [
  {
    title: <>💯 Go From zero to hero</>,
    description: (
      <>
        Go from zero to tech interview hero with this handbook. No prior
        interview experience needed.
      </>
    ),
    link: '/software-engineering-interview-guide/',
  },
  {
    title: <>📝 Curated practice questions</>,
    description: (
      <>
        No one has time to practice a few hundred questions. We created the{' '}
        <a href={BLIND_75_URL} target="_blank" rel="noopener">
          Blind 75 List
        </a>{' '}
        to tell you which the best questions are.
      </>
    ),
    link: '/coding-interview-study-plan/',
  },
  {
    title: <>📋 Interview best practices</>,
    description: (
      <>
        Straight-to-the-point Do's and Don'ts during an interview. The battle is
        already half won.
      </>
    ),
    link: '/coding-interview-best-practices/',
  },
  {
    title: <>💁‍♀️ Practical algorithm tips</>,
    description: (
      <>
        Practical tips for every algorithm topic - common techniques and corner
        cases to look out for.
      </>
    ),
    link: '/algorithms/study-cheatsheet/',
  },
  {
    title: <>💬 Behavioral questions</>,
    description: (
      <>
        Check out what behavioral questions companies commonly ask and you can
        prepare your answers ahead of time.
      </>
    ),
    link: '/behavioral-interview-questions/',
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
      <WhatIsThisSection />
      <TweetsSection />
      <HowToUseSection />
      <AlgoMonsterSection />
      <FeaturesSection />
      <EducativeSection />
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
          Brought to you by the author of{' '}
          <a href={BLIND_75_URL} rel="noopener" target="_blank">
            Blind 75
          </a>
        </p>
        <div className={styles.buttons}>
          <Link
            className={classnames('button button--primary button--lg')}
            to="/software-engineering-interview-guide/">
            Start reading now&nbsp;&nbsp;→
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
  );
}

function WhatIsThisSection() {
  return (
    <div className={classnames('padding-vert--xl', styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h2 className="text--center margin-bottom--lg">
              <span className="badge badge--primary">What is this</span>
            </h2>
            <h3
              className={classnames(
                'text--center',
                'margin-bottom--lg',
                styles.sectionTitle,
              )}>
              The fastest way to prepare effectively for your software
              engineering interviews, used by over 500,000 engineers
            </h3>
            <p
              className={classnames(
                'margin-bottom--lg',
                styles.sectionTagline,
              )}>
              Tech Interview Handbook goes{' '}
              <strong>straight to the point</strong> and tells you the{' '}
              <strong>minimum</strong> you need to know to excel in your
              technical interviews.
              <br />
              <br />
              Having personally gone through the interviewing process, it was
              frustrating to have to find resources from everywhere to prepare
              for my technical interviews.
              <br />
              <br />
              This handbook contains the essence of technical interviewing I
              gathered over my last job hunt, which allowed me to clinch 9
              offers out of 11 top Bay Area companies -{' '}
              <strong>Google, Airbnb, Palantir, Dropbox, Lyft</strong>, and some
              startups!
            </p>
          </div>
        </div>
      </div>
    </div>
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

function HowToUseStep({index, title, ctaLink, contents}) {
  return (
    <div className={classnames('card', styles.howToUseStep)}>
      <div className="card__header">
        <div className="margin-bottom--sm">
          <small className={styles.howToUseStepLabel}>STEP {index}</small>
        </div>
        <h3>{title}</h3>
      </div>
      <div className="card__body">
        <ul>
          {contents.map((content, i) => (
            <li key={i}>{content}</li>
          ))}
        </ul>
      </div>
      <div className="card__footer">
        <Link className="button button--primary button--block" to={ctaLink}>
          Read now →
        </Link>
      </div>
    </div>
  );
}

function HowToUseSection() {
  return (
    <div className={classnames('padding-vert--xl', styles.sectionAlt2)}>
      <div className="container">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h2 className="text--center margin-bottom--lg">
              <span className="badge badge--primary">How to use</span>
            </h2>
            <h3
              className={classnames(
                'text--center',
                'margin-bottom--lg',
                styles.sectionTitle,
              )}>
              Not sure where to start in your interview preparation?
              <br /> We've got you covered.
            </h3>
            <p
              className={classnames(
                'text--center',
                'margin-bottom--lg',
                styles.sectionTagline,
              )}>
              This guide is structured in a{' '}
              <strong>simple to follow, step-by-step</strong> style covering all
              aspects of your software engineering interview preparation -{' '}
              <strong>no prior interview experience required</strong>.
            </p>
          </div>
        </div>
        <div className={classnames('row', styles.featuresRow)}>
          <div
            className={classnames(
              'col',
              'col--3',
              styles.featuresRowItemContainer,
            )}>
            <HowToUseStep
              index={1}
              title={<>Prepare a FAANG-ready resume</>}
              contents={[
                <>Create an ATS-proof resume</>,
                <>Software engineering specific resume content</>,
                <>Optimizing and and testing your resume</>,
              ]}
              ctaLink="/resume/"
            />
          </div>
          <div
            className={classnames(
              'col',
              'col--3',
              styles.featuresRowItemContainer,
            )}>
            <HowToUseStep
              index={2}
              title={<>Ace the interviews</>}
              contents={[
                <>Step-by-step coding interview preparation</>,
                <>Algorithms deep dive</>,
                <>System design interview preparation</>,
                <>Behavioral interview preparation</>,
              ]}
              ctaLink="/coding-interview-prep/"
            />
          </div>
          <div
            className={classnames(
              'col',
              'col--3',
              styles.featuresRowItemContainer,
            )}>
            <HowToUseStep
              index={3}
              title={<>Negotiate the best offer</>}
              contents={[
                <>Negotiation strategies for software engineers</>,
                <>Guide on how compensation works for software engineers</>,
              ]}
              ctaLink="/understanding-compensation/"
            />
          </div>
          <div
            className={classnames(
              'col',
              'col--3',
              styles.featuresRowItemContainer,
            )}>
            <HowToUseStep
              index={4}
              title={<>Prepare for the job</>}
              contents={[
                <>How to choose between companies</>,
                <>Guide to engineering levels</>,
              ]}
              ctaLink="/choosing-between-companies"
            />
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
            <h2 className="text--center margin-bottom--lg">
              <span className="badge badge--primary">Why this guide</span>
            </h2>
            <h3
              className={classnames(
                'text--center',
                'margin-vert--lg',
                styles.sectionTitle,
              )}>
              We have everything you need - all straight to the point
            </h3>
            <div className={classnames('row', styles.featuresRow)}>
              {FEATURES.map(({title, description, link}, idx) => (
                <div
                  key={idx}
                  className={classnames(
                    'col',
                    'col--4',
                    styles.featuresRowItemContainer,
                  )}>
                  <div className={classnames('card', styles.featuresRowItem)}>
                    <h3 className={styles.featuresRowItemTitle}>{title}</h3>
                    <p className={styles.featuresRowItemDescription}>
                      {description}
                    </p>
                    {link && (
                      <Link className={styles.featuresRowItemLink} to={link}>
                        <strong>Read now →</strong>
                      </Link>
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
    <div className={classnames('padding-vert--lg', styles.sectionSponsor)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="margin-vert--lg text--center">
              <div>
                <h2 className={styles.sectionSponsorTitle}>
                  <strong>
                    Looking to get hired at FAANG? Educative's interview courses
                    helped many people get the job at FAANG. Join today for a
                    10% discount!
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
function AlgoMonsterSection() {
  return (
    <div className={classnames('padding-vert--lg', styles.sectionSponsorAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="margin-vert--lg text--center">
              <div>
                <h2 className={styles.sectionSponsorTitle}>
                  <strong>
                    Developed by Google engineers, AlgoMonster is the fastest
                    way to get a software engineering job. Join today for a 70%
                    discount!
                  </strong>
                </h2>
                <div className="margin-vert--lg">
                  <a
                    className="button button--secondary button--lg"
                    href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack="
                    rel="noopener"
                    target="_blank"
                    onClick={() => {
                      window.gtag('event', 'algomonster.homepage.click');
                    }}>
                    Stop grinding and study with a plan&nbsp;&nbsp;→
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
    <div className={classnames('padding-vert--xl', styles.sectionAlt)}>
      <div className="container">
        <h2
          className={classnames(
            'margin-bottom--lg',
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
              url="https://twitter.com/MSFTImagine/status/1502675788335886344"
              handle="MSFTImagine"
              name="Microsoft Imagine Cup"
              date="Mar 13, 2022"
              avatar="https://pbs.twimg.com/profile_images/1268173752745046016/nW2kPbvp_400x400.png"
              content={
                <>
                  Ready to rock your #Coding interviews? Follow along as
                  @yangshunz shares tips on how to land your dream job from
                  personal experience.
                </>
              }
            />
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
            <Tweet
              url="https://twitter.com/rwenderlich/status/1166336060533727232"
              handle="rwenderlich"
              name="raywenderlich.com"
              date="Aug 27, 2019"
              avatar="https://pbs.twimg.com/profile_images/1501959146568101895/gAeUOeXe_400x400.png"
              content={<>Nice open source tech interview handbook</>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessStory({name, quote, thumbnail, title}) {
  return (
    <div className="card margin-vert--lg">
      <div className="card__body">
        <p className={styles.quote}>"{quote}"</p>
      </div>
      <div className="card__header">
        <div className="avatar">
          <img alt={name} className="avatar__photo" src={thumbnail} />
          <div className="avatar__intro">
            <div className="avatar__name">{name}</div>
            <small className="avatar__subtitle">{title}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessStoriesSection() {
  const storiesColumns = [[], []];
  successStories.forEach((tweet, i) => storiesColumns[i % 2].push(tweet));

  return (
    <div className={classnames('padding-vert--xl', styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h2 className="text--center margin-bottom--lg">
              <span className="badge badge--primary">Success stories</span>
            </h2>
            <h3
              className={classnames(
                'margin-vert--lg',
                'text--center',
                styles.sectionTitle,
              )}>
              Countless engineers have gotten a job at FAANG with this free
              handbook
            </h3>
          </div>
        </div>
        <div className={classnames('row', styles.tweetsSection)}>
          <div className="col col--offset-2 col--4">
            {storiesColumns[0].map((user) => (
              <SuccessStory key={user.name} {...user} />
            ))}
          </div>
          <div className="col col--4">
            {storiesColumns[1].map((user) => (
              <SuccessStory key={user.name} {...user} />
            ))}
          </div>
        </div>
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
  );
}

function SponsorshipSection() {
  return (
    <div className={classnames('padding-vert--xl')}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h2 className="text--center margin-bottom--lg">
              <span className="badge badge--primary">Advertise with us</span>
            </h2>
            <h3
              className={classnames(
                'margin-vert--lg',
                'text--center',
                styles.sectionTitle,
              )}>
              Interested in advertising on Tech Interview Handbook?
            </h3>
            <p className={classnames(styles.sectionTagline, 'text--center')}>
              Leverage on more than 200,000 monthly page views from 40,000 to
              50,000 unique software engineers.
            </p>
            <p className={classnames(styles.sectionTagline, 'text--center')}>
              Sponsors can choose any or all of the following positions to
              advertise with us:
            </p>
            <div className={styles.sectionTagline}>
              <div className="row">
                <div className="col col--5 col--offset-1">
                  <ul className={styles.sponsorshipList}>
                    <li>✅ Top banner of every page</li>
                    <li>✅ Homepage</li>
                    <li>✅ Sidebar of every page</li>
                  </ul>
                </div>
                <div className="col col--5">
                  <ul className={styles.sponsorshipList}>
                    <li>✅ Navigation menu</li>
                    <li>✅ Bottom of every page</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="margin-top--lg text--center">
              <a
                className="button button--primary button--lg margin-right--md"
                href="mailto:contact@techinterviewhandbook.org"
                rel="noopener"
                target="_blank">
                Advertise with us!
              </a>
              <Link
                className="button button--secondary button--lg"
                to="/advertise">
                Find out more
              </Link>
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
            <Link
              className={classnames('button button--primary button--lg')}
              to="/software-engineering-interview-guide/">
              Start reading now&nbsp;&nbsp;→
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
