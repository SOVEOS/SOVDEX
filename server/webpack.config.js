const path = require('path')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'

module.exports = {
	target: 'node',
	mode: 'production',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	]
}