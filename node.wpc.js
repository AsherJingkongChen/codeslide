import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin2';
import TerserPlugin from 'terser-webpack-plugin';

export default (_env, argv) => nodeConfig(argv.mode);

const rootPath = dirname(fileURLToPath(import.meta.url));

const nodeConfig = (mode) => ({
  entry: './src/node/code/index.ts',
  output: {
    path: resolve(rootPath, 'dist/node/'),
    filename: './code/index.js',
    library: {
      type: 'module' // [!] For EsModule
    }
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.ejs',
    ]
  },
  stats: (mode === 'production') ? undefined : 'minimal',
  performance: {
    hints: false
  },
  optimization: {
    minimize: mode === 'production',
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
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' }
        ]
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/node/asset/', to: './asset/' }],
    }),

    ...(
      mode === 'production'
        ? [new Visualizer({
            filename: '../../doc/node/stats.html'
          })] : []
    )
  ],
  externalsPresets: {
    node: true // [!] For Node.js
  }, 
  experiments: {
    topLevelAwait: true,
    outputModule: true // [!] For EsModule
  },
});
