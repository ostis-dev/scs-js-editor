const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const outputPath = path.resolve(__dirname, 'build');

module.exports = {
  mode: 'none',
  entry: {
    app: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      "languages": [],
      "features": [
        '!accessibilityHelp', '!anchorSelect', '!colorDetector', '!fontZoom', '!multicursor', '!onTypeRename',
        '!parameterHints', '!quickCommand', '!quickHelp', '!quickOutline', '!referenceSearch',
        '!toggleHighContrast', '!transpose', '!unusualLineTerminators'
      ]
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  externalsPresets: { node: true },
  output: {
    filename: 'scs.js',
    path: outputPath,
    libraryTarget: 'umd'
  }
};