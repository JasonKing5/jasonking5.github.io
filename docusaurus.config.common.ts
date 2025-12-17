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
  
  scripts: [
    {
      src: 'https://analytics.codefe.cn/script.js',
      async: true,
      defer: true,
      'data-website-id': 'b02f2e6d-d898-4f11-913a-0a94e31dbf78',
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
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
          sidebarId: 'aiSidebar',
          position: 'left',
          label: 'AI',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'algorithmsSidebar',
        //   position: 'left',
        //   label: 'Algorithms',
        // },
        {to: '/algorithm', label: 'Algorithm', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'softSidebar',
          position: 'left',
          label: 'Soft Power',
        },
        {to: '/tool', label: 'Tool', position: 'left'},
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
        {
          type: 'html',
          value: `<div id="login-button-container">
                    <div class="login-button-container" style="position: relative; display: inline-block;">
                      <a href="#" class="login-btn" style="display: flex; align-items: center; justify-content: center; background: white; color: var(--ifm-color-primary); width: 36px; height: 36px; border-radius: 50%; cursor: pointer; transition: all 0.2s; text-decoration: none;" onclick="event.preventDefault(); const user = localStorage.getItem('user'); window.location.href = user ? '/profile' : '/login';" onmouseover="this.style.background='var(--ifm-color-primary)';this.style.color='white';" onmouseout="this.style.background='white';this.style.color='var(--ifm-color-primary)';" onmousedown="this.style.background='var(--ifm-color-primary-darker)';" onmouseup="this.style.background='var(--ifm-color-primary)';">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>`,
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'CodeFE',
          items: [
            {
              label: 'common',
              to: '/docs/category/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90%E5%8E%9F%E7%90%86/',
            },
            {
              label: 'front-end',
              to: '/docs/category/internet/',
            },
            {
              label: 'back-end',
              to: '/docs/category/nodejs-开发实战/',
            },
          ],
        },
        {
          title: 'team',
          items: [
            {
              label: 'Jason 庄生',
              href: 'https://space.bilibili.com/286327785',
            },
            {
              label: 'Dixin 帝心',
              href: 'https://space.bilibili.com/110937561',
            },
          ],
        },
        {
          title: 'more',
          items: [
            {
              label: 'CodeFE',
              href: 'https://www.codefe.cn/',
            },
            {
              label: 'HMXY',
              href: 'https://hm.codefe.cn/',
            },
            {
              label: 'Poetry',
              href: 'https://poetry.codefe.cn/',
            },
          ],
        },
      ],
      copyright: `ICP备案<a href=" https://beian.miit.gov.cn/" target="_blank" style="margin-left: 5px; margin-right: 20px; color: #b5b5b5">豫ICP备2022004823号-1</a> Copyright ${new Date().getFullYear()} Code FE`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
