const pkgJson = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clone = (...args) => Object.assign({}, ...args);
const env = process.env;
const runAnalyzer = !!env.ANALYZE;
const { version } = pkgJson;
const sdkName = 'sm-ui-controls';

const uglifyJsOptions = {
  screwIE8: true,
  stats: true,
  compress: {
    warnings: false,
  },
  mangle: {
    toplevel: true,
    eval: true,
  },
  sourceMap: true,
};

const baseConfig = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Add .ts extension
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'ts-loader', // Use ts-loader
        },
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'], // Add @babel/preset-typescript
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
    ],
  },
  performance: {
    // hints: false,
    // maxEntrypointSize: 512000,
    // maxAssetSize: 512000,
  },
  devServer: {
    port: 8000,
    static: path.join(__dirname, ''),
    watchFiles: path.join(__dirname, 'src'),
    compress: true,
  },
};

function getPluginsForConfig(type, minify = false) {
  const defineConstants = getConstantsForConfig(type);

  const plugins = [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin(defineConstants),
    new MiniCssExtractPlugin({
      filename: minify ? `${sdkName}.${version}.min.css` : `${sdkName}.${version}.css`,
      chunkFilename: minify ? `[id].${version}.min.css` : `[id].${version}.css`,
    }),
  ];

  if (runAnalyzer && !minify) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: `bundle-analyzer-report.${type}.html`,
      }),
    );
  } else {
    // https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/115
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }

  return plugins;
}

function getConstantsForConfig(type) {
  // By default the "main" dist (hls.js & hls.min.js) are full-featured.
  return {
    __VERSION__: JSON.stringify(version),
  };
}

const multiConfig = [
  {
    name: 'debug',
    mode: 'development',
    output: {
      filename: `${sdkName}.${version}.js`,
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      library: 'SmUIControls',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    optimization: {
      minimize: false,
    },
    plugins: getPluginsForConfig('main'),
    devtool: 'source-map',
  },
  {
    name: 'dist',
    mode: 'production',
    output: {
      filename: `${sdkName}.${version}.min.js`,
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      library: 'SmUIControls',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    optimization: {
      minimize: true,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
    plugins: getPluginsForConfig('main', true),
  },
].map((config) => clone(baseConfig, config));

// multiConfig.push(demoConfig);

// webpack matches the --env arguments to a string; for example, --env.debug.min translates to { debug: true, min: true }
module.exports = () => {
  return multiConfig;
};
