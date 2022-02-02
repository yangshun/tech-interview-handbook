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
        {href: '/introduction', label: 'Getting started', position: 'left'},
        {
          href: '/coding-interview',
          label: 'Coding',
        },
        {
          href: '/system-design',
          label: 'System design',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/yangshun/tech-interview-handbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-github',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://www.facebook.com/techinterviewhandbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-facebook',
          'aria-label': 'Facebook page',
        },
        {
          href: 'https://twitter.com/yangshunz',
          position: 'right',
          className: 'navbar-icon navbar-icon-twitter',
          'aria-label': 'Twitter page',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Yangshun Tay. Built with Docusaurus.`,
      links: [
        {
          title: 'General',
          items: [
            {
              label: 'Get started',
              href: '/introduction',
            },
            {
              label: 'Blog',
              href: '/blog',
            },
            {
              label: 'Algorithms',
              href: '/algorithms/introduction',
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
              label: 'Coding round',
              href: '/coding-interview',
            },
            {
              label: 'System design',
              href: '/system-design',
            },
            {
              label: 'Behavioral round',
              href: '/behavioral-round-overview',
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
              label: 'Facebook',
              href: 'https://www.facebook.com/techinterviewhandbook',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/yangshunz',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Contact us',
              href: 'mailto:business@techinterviewhandbook.org',
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
          editUrl:
            'https://github.com/yangshun/tech-interview-handbook/edit/master/contents/',
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
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4984084888641317',
      crossorigin: 'anonymous',
      async: true,
    },
  ],
};
