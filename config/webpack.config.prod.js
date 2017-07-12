const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.noDeprecation = true;

const PATHS = {
  publicPath: '/',
  app: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
};

const plugin = new ExtractTextPlugin({
	filename: '[name].[contenthash:8].css'
});

const env = {};
env['process.env.NODE_ENV'] = JSON.stringify('production');

module.exports = {
	context: path.resolve(__dirname, '../src'),
	entry: {
		app: ['babel-polyfill', PATHS.app]
	},
	target: 'web',
	devtool: 'source-map',
	performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 10000000, // in bytes
      maxAssetSize: 45000000, // in bytes
    },
	output: {
		path: PATHS.build,
		filename: '[name].js',
		publicPath: PATHS.publicPath,
		chunkFilename: '[name].[chunkhash:8].js',
		filename: '[name].[chunkhash:8].js'
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
			  use: plugin.extract({
				use: ['css-loader', 'sass-loader', {
				  loader: 'postcss-loader',
				  options: {
					plugins: () => ([
					  require('autoprefixer')()
					])
				  }
				}],
				fallback: 'style-loader'
			  })
			},
		  {
			test: /\.(png|jpe?g|gif|ico|svg)$/,
			
			use: {
			  loader: 'url-loader',
			  options: {
					limit: 15000,
					name: '[path][name].[hash:8].[ext]',
			  }
			}
		  },
		  {
			test: /\.(webm|mp4)$/,
			use: {
			  loader: 'file-loader',
			  options: {
					limit: 15000,
					name: '[path][name].[hash:8].[ext]',
			  }
			}
		  },
		  {
			test: /JSONStream/,
			use: 'shebang-loader'
		  }
		]
	},
	recordsPath: path.join(__dirname, 'records.json'),
	plugins: [
		new HtmlWebpackPlugin({
		  filename: "index.html",
		  title: 'SynBaaS | Syntel\'s Backend-as-a-Service',
		  template: '../config/index.html',
		  favicon: '../src/assets/images/favicon.ico',
		  chunks: ['app', 'manifest', 'vendor']
		}),

		new webpack.DefinePlugin(env),
		new webpack.HashedModuleIdsPlugin(),
		new PreloadWebpackPlugin({
			rel: 'preload',
			as: 'script',
			include: 'all'
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false
		}),
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: {
			  discardComments: {
				removeAll: true,
				// Run cssnano in safe mode to avoid
				// potentially unsafe transformations.
				safe: true
			  }
			},
			canPrint: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) => (
				resource &&
				resource.indexOf('node_modules') >= 0 &&
				resource.match(/\.js$/)
			),
		}),
		new webpack.optimize.CommonsChunkPlugin({
		  name: 'manifest',
		  minChunks: Infinity
		}),
		plugin,
		new PurifyCSSPlugin({ paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }) })
	],
};

