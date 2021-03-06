const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = glob
  .sync(PAGES_DIR + '**/*')
  .filter((fileName) => fileName.endsWith('.pug'))

function getEntries() {
  return PAGES.reduce(
    (a, page) => ({
      ...a,
      [path.basename(page).replace(/\.pug/, '')]: page.replace(/\.pug/, '.js')
    }),
    {}
  )
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    ...getEntries()
  },
  output: {
    filename: `${PATHS.assets}js/[name].[chunkhash].js`,
    path: PATHS.dist,
    publicPath: './'
  },
  optimization: {
    runtimeChunk: 'single', // enable "runtime" chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './../fonts',
          outputPath: PATHS.assets + 'fonts',
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './../img',
          outputPath: PATHS.assets + 'img',
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: { config: `./postcss.config.js` }
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `./postcss.config.js` }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.pug'],
    alias: {
      '@': PATHS.src,
      Components: PATHS.src + '/pug/components/'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[chunkhash].css`
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/static`, to: `` },
      ]
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${page}`,
          chunks: [path.basename(page).replace(/\.pug/, ''), 'common'],
          filename: `${path.basename(page).replace(/\.pug/, '.html')}`
        })
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
