module.exports = {
  title: 'Tech Interview Handbook',
  tagline: 'Free curated interview preparation materials for busy engineers',
  url: 'https://www.techinterviewhandbook.org',
  baseUrl: '/',
  trailingSlash: true,
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'tech-interview-handbook',
  themeConfig: {
    announcementBar: {
      id: 'announcement-1', // Increment on change
      content: `⭐️ Bring your interview skills to the next level with Educative. <a href="https://www.educative.io/explore?search_string=interview&aff=x23W">Join today for a discount!</a> ⭐️`,
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
          href: '/introduction',
          position: 'left',
        },
        {
          label: 'Coding interview guide',
          href: '/coding-interview',
        },
        {
          label: 'Algorithms 101',
          href: '/algorithms/introduction',
        },
        {label: 'Blog', to: 'blog', position: 'left'},
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
      copyright: `Copyright © ${new Date().getFullYear()} Yangshun Tay. Built with Docusaurus.`,
      links: [
        {
          title: 'General',
          items: [
            {
              label: 'Start reading',
              href: '/introduction',
            },
            {
              label: 'Resume preparation',
              href: '/resume/guide',
            },
            {
              label: 'Algorithms',
              href: '/algorithms/introduction',
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
              label: 'Interview cheatsheet',
              href: '/cheatsheet',
            },
            {
              label: 'Coding interviews',
              href: '/coding-interview',
            },
            {
              label: 'System design interviews',
              href: '/system-design',
            },
            {
              label: 'Behavioral interviews',
              href: '/behavioral-interview',
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
              label: 'Contact us',
              href: 'mailto:contact@techinterviewhandbook.org',
            },
          ],
        },
      ],
    },
    algolia: {
      apiKey: '4dabb055be464346fcb6877f086f08e8',
      indexName: 'techinterviewhandbook',
    },
    metadata: [
      {name: 'fo-verify', content: '6993fa63-071e-4d11-8b10-a247c54c6061'},
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
          showLastUpdateAuthor: true,
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
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/coding-round-overview',
            to: '/coding-interview',
          },
          {
            from: '/behavioral-round-overview',
            to: '/behavioral-interview',
          },
        ],
      },
    ],
  ],
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4984084888641317',
      crossorigin: 'anonymous',
      async: true,
    },
  ],
};
