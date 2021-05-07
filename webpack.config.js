const path = require('path')
const webpack = require('webpack')

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(env.API_URL),
      })
    ],
  }
}


