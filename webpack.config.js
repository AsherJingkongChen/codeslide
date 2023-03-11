import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';

export default (_env, argv) => {
  return {
    stats:
      argv.mode === 'development'
        ? 'minimal'
        : undefined,
    entry: './src/index.tsx',
    output: {
      path: resolve(
        dirname(fileURLToPath(import.meta.url)),
        'dist'
      ),
      filename: 'bundle.js'
    },
    devServer: {
      compress: true,
      static: false,
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
    performance: { hints: false },
    devtool:
      argv.mode === 'development'
        ? 'source-map'
        : undefined,
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: { drop_console: true },
            output: {
              comments: false,
              beautify: false
            }
          }
        }),
        new HtmlMinimizerPlugin()
      ]
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
                presets: ['solid']
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            argv.mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName:
                    argv.mode == 'development'
                      ? '[name]^[local]'
                      : '[hash:base64]'
                }
              },
            }
          ],
        },
        {
          test: /\.less$/,
          use: [
            argv.mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName:
                    argv.mode == 'development'
                      ? '[name]=[local]'
                      : '[hash:base64]'
                }
              },
            },
            'less-loader'
          ],
        },
      ]
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.css',
        '.less',
        '.html'
      ]
    },
    plugins: [
      // Copy our static assets to the final build
      new CopyPlugin({
        patterns: [{ from: './asset/', to: './asset/' }]
      }),

      // Make an index.html from the template
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: argv.mode === 'production'
      }),

      new SpeedMeasurePlugin({
        disable: argv.mode === 'development'
      }),

      new MiniCssExtractPlugin(),
    ],
    experiments: {
      topLevelAwait: true
    }
  };
};
