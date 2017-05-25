// webpack.config.js
const webpack = require('webpack');
const path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
	context: path.resolve(__dirname, 'src'),
	entry: ['./app.js', './style.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['es2015', { modules: false }]
					]
				}
			}]
		},
			{ // regular css files
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					loader: 'css-loader?importLoaders=1',
				}),
			},
			{ // sass / scss loader for webpack
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			}
		],
		// loaders: [
		// 	// Extract css files
		// 	{
		// 		test: /\.css$/,
		// 		use:  ExtractTextPlugin.extract({
		// 			use: 'css-loader?importLoaders=1',
		// 		}),
		// 	},
		// 	// Optionally extract less files
		// 	// or any other compile-to-css language
		// 	{
		// 		test: /\.(sass|scss)$/,
		// 		use:  ExtractTextPlugin.extract({
		// 			use: 'sass-loader?importLoaders=1',
		// 		}),
		// 	}
		// 	// You could also use other loaders the same way. I. e. the autoprefixer-loader
		// ]
	},
	// Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
	plugins: [
		new ExtractTextPlugin({ // define where to save the file

			filename: '[name].bundle.css',
			allChunks: true,
		}),
	],
};

module.exports = config;