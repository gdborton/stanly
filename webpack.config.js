var webpack = require('webpack');
var port = process.env.PORT || 3001;
var address = process.env.PORT ? 'http://' + process.env.C9_PROJECT + '-' + process.env.C9_USER + '.c9.io' : 'http://localhost:' + port;
var entries = ['webpack-dev-server/client?' + address, 'webpack/hot/dev-server'];
var config = {
  entry: {
    application: entries.concat('./src/components/application.jsx')
  },
  debug: true,
  devtool: 'source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader?harmony']}
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify('development')}
      })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;
