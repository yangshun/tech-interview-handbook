module.exports = {
  title: 'Tech Interview Handbook',
  tagline: 'Free curated interview preparation materials for busy engineers',
  url: 'https://techinterviewhandbook.org',
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
        {href: '/introduction', label: 'Getting Started', position: 'right'},
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          href: 'https://github.com/yangshun/tech-interview-handbook',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.facebook.com/techinterviewhandbook',
          label: 'Facebook',
          position: 'right',
        },
        {
          href: 'https://twitter.com/yangshunz',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Yangshun Tay. Built with Docusaurus.`,
    },
    gtag: {
      trackingID: 'UA-44622716-2',
    },
    algolia: {
      apiKey: '4dabb055be464346fcb6877f086f08e8',
      indexName: 'techinterviewhandbook',
    },
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
