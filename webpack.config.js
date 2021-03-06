// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'main-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
   plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({ template: './src/template.html' }),
    ],
  /* loaders */
  module: {
    rules: [
      {
        // this is regex, it tells webpack to look for files that end with .css
        test: /\.scss$/,
        // the sequence here matters! style-loader needs to come before css-loader
        // because webpack reads these things from right to left
        use: [
          MiniCssExtractPlugin.loader, // step 3: injects Javascript into the DOM
          'css-loader', // step 2: turns css into valid Javascript
          'sass-loader', // step 1: converts sass to css
        ],
      },
      {
       test: /\.js$/, /* this is regex it tells webpack to look for all files which end in .js*/ 
       use: {
         /* this will automatically reference a .babelrc file */
         loader: 'babel-loader',
       },
      },
    ],
  },
};