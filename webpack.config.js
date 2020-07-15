const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'node_modules'),
    ],
    compress: false,
    port: 3000,
    index: 'index.html',
  },
  watch: true,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
