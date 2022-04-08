module.exports = {
  title: 'Tech Interview Handbook',
  tagline: 'Free curated interview preparation materials for busy people',
  url: 'https://www.techinterviewhandbook.org',
  baseUrl: '/',
  trailingSlash: true,
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'tech-interview-handbook',
  themeConfig: {
    announcementBar: {
      id: 'algomonster', // Increment on change
      content: `Stop the grind and study with a plan! Developed by Google engineers, 
      <a href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=" target="_blank" rel="noopener">AlgoMonster</a> is the fastest way to get a software engineering job. 
      <a href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack=" target="_blank" rel="noopener">Check it out now!</a>`,
      isCloseable: false,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Tech Interview Handbook',
      logo: {
        alt: '',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Start reading',
          href: '/software-engineering-interview-guide/',
          position: 'left',
        },
        {
          label: 'Coding',
          href: '/coding-interview-prep/',
        },
        {
          label: 'Algorithms',
          href: '/algorithms/study-cheatsheet',
        },
        {label: 'Blog', to: 'blog', position: 'left'},
        {
          label: 'Grind 75',
          href: 'https://www.techinterviewhandbook.org/grind75',
          position: 'left',
        },
        // {label: 'Advertise', to: '/advertise', position: 'left'},
        {
          href: 'https://github.com/yangshun/tech-interview-handbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-github',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://t.me/techinterviewhandbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-telegram',
          'aria-label': 'Telegram channel',
        },
        {
          href: 'https://twitter.com/techinterviewhb',
          position: 'right',
          className: 'navbar-icon navbar-icon-twitter',
          'aria-label': 'Twitter page',
        },
        {
          href: 'https://www.facebook.com/techinterviewhandbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-facebook',
          'aria-label': 'Facebook page',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Tech Interview Handbook. Built with Docusaurus.`,
      links: [
        {
          title: 'General',
          items: [
            {
              label: 'Start reading',
              href: '/software-engineering-interview-guide/',
            },
            {
              label: 'Resume preparation',
              href: '/resume/',
            },
            {
              label: 'Algorithms',
              href: '/algorithms/study-cheatsheet',
            },
            {
              label: 'Blog',
              href: '/blog',
            },
          ],
        },
        {
          title: 'Interviews',
          items: [
            {
              label: 'Coding interviews',
              href: '/coding-interview-prep/',
            },
            {
              label: 'Study plan',
              href: '/coding-interview-study-plan/',
            },
            {
              label: 'System design interviews',
              href: '/system-design/',
            },
            {
              label: 'Behavioral interviews',
              href: '/behavioral-interview/',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yangshun/tech-interview-handbook',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/techinterviewhandbook',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/techinterviewhandbook',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/techinterviewhb',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Grind 75',
              href: 'https://www.techinterviewhandbook.org/grind75',
            },
            {label: 'Advertise', href: '/advertise'},
            {
              label: 'Contact us',
              href: 'mailto:contact@techinterviewhandbook.org',
            },
          ],
        },
      ],
    },
    algolia: {
      appId: 'Y09P1J4IPV',
      apiKey: 'e12588cbae68d752469921cc46e9cb66',
      indexName: 'techinterviewhandbook',
    },
    metadata: [
      {name: 'fo-verify', content: '2cc93525-ece8-402e-a4b8-d1d0853175e8'},
    ],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../contents',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'UA-44622716-2',
        },
      },
    ],
  ],
};
