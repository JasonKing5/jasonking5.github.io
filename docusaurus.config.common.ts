import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


/** @type {import('@docusaurus/types').Config} */
const config: Config = {
  title: 'Code FE',
  tagline: 'Code FE',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.codefe.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // Allow to customize the presence/absence of a trailing slash at the end of URLs/links, and how static HTML files are generated:
  // undefined (default): keeps URLs untouched, and emit /docs/myDoc/index.html for /docs/myDoc.md
  // true: add trailing slashes to URLs/links, and emit /docs/myDoc/index.html for /docs/myDoc.md
  // false: remove trailing slashes from URLs/links, and emit /docs/myDoc.html for /docs/myDoc.md
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Code FE', // Usually your GitHub org/user name.
  projectName: 'Code FE', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    // locales: ['zh-CN', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://gitee.com/mayuanwei/harmonyOS_bilibili/blob/master/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All posts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://gitee.com/mayuanwei/harmonyOS_bilibili/blob/master/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    // announcementBar: {
    //   id: 'support_us',
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="/docs/community/team">this survey</a>',
    //   backgroundColor: '#fafbfc',
    //   textColor: '#091E42',
    //   isCloseable: true,
    // },
    navbar: {
      // title: 'Code FE',
      logo: {
        alt: 'Code FE Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'commonSidebar',
          position: 'left',
          label: 'Common',
        },
        {
          type: 'docSidebar',
          sidebarId: 'frontendSidebar',
          position: 'left',
          label: 'Front-end',
        },
        {
          type: 'docSidebar',
          sidebarId: 'backendSidebar',
          position: 'left',
          label: 'Back-end',
        },
        {
          type: 'docSidebar',
          sidebarId: 'softSidebar',
          position: 'left',
          label: 'Soft Power',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'doc',
          docId: 'about',
          label: 'About',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        {
          href: 'https://github.com/JasonKing5',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `ICP备案<a href=" https://beian.miit.gov.cn/" target="_blank" style="margin-left: 5px; margin-right: 20px; color: #b5b5b5">豫ICP备2022004823号-1</a> Copyright © ${new Date().getFullYear()} Code FE`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,};

export default config;
