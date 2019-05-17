module.exports = {
  /*webpack(config, options) {
    // Further custom configuration here
    config.externals = ["puppeteer"]
    return config
  },*/
  exportPathMap () {
    // Let Next.js know where to find the entry page
    // when it's exporting the static bundle for the use
    // in the production version of your app
    return {
      '/start': { page: '/start' }
    }
  }
}
