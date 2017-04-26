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
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]', {
					loader: 'image-webpack-loader',
					query: {
						mozjpeg: {
							progressive: true,
						},
						gifsicle: {
							interlaced: false,
						},
						optipng: {
							optimizationLevel: 4,
						},
						pngquant: {
							quality: '75-90',
							speed: 3,
						},
					},
				}],
				exclude: /node_modules/,
				include: __dirname,
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
