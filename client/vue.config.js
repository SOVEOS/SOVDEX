module.exports = {
    runtimeCompiler: true, 
    // '/sovdex/' path need for gh-pages
    publicPath: process.env.NODE_ENV == 'production' ? '/sovdex/' : '/',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        }
    },
    configureWebpack: {
        output: {
          filename: '[name].js',
          chunkFilename: '[name].js'
        }
      }
}