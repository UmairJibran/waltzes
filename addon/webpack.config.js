const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    background: path.join(__dirname, 'src', 'background.ts'),
    content: path.join(__dirname, 'src', 'content.tsx'),
    popup: path.join(__dirname, 'src', 'content.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new MiniCssExtractPlugin({
      filename: 'content.styles.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function (content) {
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
        {
          from: 'src/assets/img/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/icon-34.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
  ],
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  devServer: {
    allowedHosts: 'all',
  },
};
