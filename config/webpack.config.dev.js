const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.noDeprecation = true;

const env = {};

env['process.env.NODE_ENV'] = JSON.stringify('development');

const PATHS = {
  publicPath: '/',
  app: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
};

module.exports = {
	context: path.resolve(__dirname, '../src'),
	entry: {
		app: ['babel-polyfill', 'react-hot-loader/patch', PATHS.app]
	},
	target: 'web',
	devtool: 'cheap-module-eval-source-map',
	output: {
		path: PATHS.build,
		filename: '[name].js',
		publicPath: PATHS.publicPath,
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },
    resolve: {
		extensions: ['.js', '.jsx', '.json']
    },
    node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
    },
	devServer: {
		historyApiFallback: true,
		publicPath: PATHS.publicPath,
		hot: true,
		open: true,
		host: process.env.HOST,
		port: process.env.PORT,
		quiet: false,
		overlay: {
			errors: true,
			warnings: false
		},
		stats: {
			// Config for minimal console.log mess.
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	},
	module: {
		rules: [
		  {
			test: /\.(eot|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
			use: {
			  loader: 'file-loader',
			  options: {
				name: '[path][name].[hash:8].[ext]'
			  }
			}
		  },
		  {
			test: /\.(js|jsx)$/,
			include: PATHS.app,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
			  // Enable caching for improved performance during
			  // development.
			  // It uses default OS directory by default. If you need
			  // something more custom, pass a path to it.
			  // I.e., { cacheDirectory: '<path>' }
			  cacheDirectory: true
			}
		  },
		  {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		  },
		  {
			test: /\.(png|jpe?g|gif|ico|svg)$/,
			
			use: {
			  loader: 'url-loader'
			}
		  },
		  {
			test: /\.(webm|mp4)$/,
			use: {
			  loader: 'file-loader'
			}
		  },
		  {
			test: /JSONStream/,
			use: 'shebang-loader'
		  }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		  filename: "index.html",
		  title: 'SynBaaS | Syntel\'s Backend-as-a-Service',
		  template: '../config/index.html',
		  favicon: '../src/assets/images/favicon.ico',
		  chunks: ['app', 'manifest', 'vendor']
		}),
		new webpack.ProvidePlugin({
		  Promise: 'bluebird',
		  'window.Promise': 'bluebird',
		  'global.Promise': 'bluebird',
		}),
		new webpack.DefinePlugin(env),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

