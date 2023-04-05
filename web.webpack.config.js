import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin2';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (_env, argv) => configure(argv.mode);

const rootPath = dirname(fileURLToPath(import.meta.url));

const configure = (mode) => ({
  entry: './src/web/code/index.tsx',
  output: {
    path: resolve(rootPath, 'dist/web/'),
    filename: './code/index.js',
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ]
  },
  stats: (mode === 'production') ? undefined : 'minimal',
  optimization: {
    minimize: mode === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: {
            drop_console: true,
            passes: 2
          },
          output: {
            comments: false
          }
        }
      }),
    ]
  },
  devtool: (mode === 'production') ? undefined : 'source-map',
  devServer: {
    devMiddleware: {
      index: '/asset/index.html',
    },
    static: false,
    compress: true,
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: true
      },
      progress: true
    },
    port: 8081
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
            './**/*.ejs'
          ],
        },
      }],
    }),

    new HtmlWebpackPlugin({
      template: './src/web/asset/index.ejs',
      filename: './asset/index.html',
      minify: mode === 'production',
      inject: mode === 'development',
    }),

    ...(
      mode === 'production'
        ? [new Visualizer({
            filename: '../../doc/web/stats.html'
          })] : []
    )
  ],
  experiments: {
    topLevelAwait: true
  },
});
