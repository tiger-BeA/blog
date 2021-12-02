module.exports = {
  theme: "antdocs",
  title: "tiger BeA",
  description: "个人笔记",
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/assets/logo.svg" }]
  ],
  markdown: {
    lineNumbers: false,
  },
  bundler: '@vuepress/bundler-vite',
  themeConfig: {
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "Last Updated",
    repo: "https://github.com/tiger-BeA?tab=repositories",
    editLinks: false,
  },
  plugins: [
    '@vuepress/blog',
    '@vuepress/nprogress',
    '@vuepress/plugin-back-to-top'
  ],
  // TODO: 没用，因为 vuepress 暂时不支持侧边栏更新
  // extraWatchFiles: ['**/sidebar-menu.js']
};
