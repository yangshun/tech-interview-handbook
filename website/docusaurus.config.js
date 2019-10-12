module.exports = {
  title: 'Tech Interview Handbook',
  tagline:
    'Carefully curated content to help you ace your next technical interview',
  url: 'https://yangshun.github.io',
  baseUrl: '/tech-interview-handbook/',
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'tech-interview-handbook',
  themeConfig: {
    navbar: {
      title: 'Tech Interview Handbook',
      logo: {
        alt: 'Tech Interview Handbook Logo',
        src: 'img/logo.svg',
      },
      links: [
        {to: 'introduction', label: 'Getting Started', position: 'right'},
        {
          href: 'https://github.com/yangshun/tech-interview-handbook',
          label: 'GitHub',
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
      apiKey: 'bd359779d1c4c71ade6062e8f13f5a83',
      indexName: 'yangshun-tech-interview',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../contents',
          routeBasePath: '',
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
};
