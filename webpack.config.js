const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: join(__dirname, '/dist/'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html',
	})],
	devtool: '#inline-source-map',
	devServer: {
		contentBase: './dist',
		quiet: true,
	},
}
