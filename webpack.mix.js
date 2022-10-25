let mix = require('laravel-mix');
let webpack = require('webpack');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
/*mix.js('resources/auth/app.js', 'public/react/auth/js').react()
.sass('resources/sass/app.scss', 'public/react/css');*/
mix.js('resources/js/app.js', 'public/react/main/js').react()
  .sass('resources/sass/app.scss', 'public/css')
.webpackConfig({
    output: {
   filename: '[name].[contenthash].js',
   chunkFilename: 'react/main/js/[name][chunkhash].js',
 },
 });
//mix.js('resources/js/app.js', 'public/react/main/js').react()
//.sass('resources/sass/app.scss', 'public/react/css');


mix.webpackConfig(

  module.exports = {
  //   resolve: {
  //     fallback: {
  //       assert: false,
  //       buffer: false,
  //       console: false,
  //       constants: false,
  //       crypto: false,
  //       domain: false,
  //       events: false,
  //       http: false,
  //       https:false,
  //       os: false,
  //       path: false,
  //       punycode: false,
  //       process: false,
  //       querystring: false,
  //       stream: false,
  //       string_decoder: false,
  //       sys: false,
  //       timers: false,
  //       tty: false,
  //       url: false,
  //       util: false,
  //       vm:false,
  //       zlib: false,
  //       fs:false
  //     }
  //   },
    // ...
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  }



);

/*mix.react('resources/js/app.js', 'public/react/main/js')
.sass('resources/sass/app.scss', 'public/react/css')
.webpackConfig({
 
    output: {
        publicPath: '/',
       filename: '[name].[contenthash].js',
            //     chunkFilename: `generated/chunks/[name]${mix.config.inProduction ? '.[chunkhash].chunk.js' : '.[chunkhash]chunk.js'}`,
       chunkFilename: `react/main/chuncks/[name]${mix.config.inProduction ? '[chunkhash].js' : '[chunkhash].js'}`,
   //     chunkFilename: `generated/chunks/[name]${mix.config.inProduction ? '.[chunkhash].chunk.js' : '.[chunkhash]chunk.js'}`,
    }
});;*/