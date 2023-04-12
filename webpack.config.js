import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin2';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (_env, argv) => configure(argv.mode);

const rootPath = dirname(fileURLToPath(import.meta.url));

const configure = (mode) => ({
  entry: './src/web/index.ts',
  output: {
    path: resolve(rootPath, './dist/'),
    filename: './index.js',
    library: {
      type: 'module',
    },
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ]
  },
  stats: true,
  optimization: {
    minimize: mode === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2017,
          compress: {
            drop_console: true
          },
          output: {
            braces: true,
            comments: false
          }
        },
        extractComments: false
      }),
    ]
  },
  devtool: false,
  // devServer: {
  //   devMiddleware: {
  //     index: '/index.j2',
  //   },
  //   static: false,
  //   compress: true,
  //   client: {
  //     logging: 'warn',
  //     overlay: {
  //       errors: true,
  //       warnings: true
  //     },
  //     progress: true
  //   },
  //   port: 8081
  // },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['solid']
              ]
            }
          },
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: './src/web/asset/',
        to: './asset/',
        noErrorOnMissing: true,
        globOptions: {
          ignore: [
            './**/*.j2'
          ],
        },
      }],
    }),

    new HtmlWebpackPlugin({
      template: './src/web/asset/index.j2',
      filename: './index.j2',
      minify: mode === 'production',
      inject: false,
    }),

    ...(
      mode === 'production' ?
        [new Visualizer({
          filename: '../doc/web/stats.html'
        })] : []
    )
  ],
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
});
