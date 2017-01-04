const
	path     = require('path'),
	webpack  = require('webpack'),
	Html     = require('html-webpack-plugin')

module.exports = {
	entry: './resources/jsx/app.jsx',
	output: {
		filename: 'app.js',
		path: path.join(__dirname, 'public/')
	},
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/,
				query: {  presets: ['es2015', 'react']  },
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=30000&name=images/[name].[hash].[ext]'
			},
			{
				test: require.resolve('jquery-mobile/dist/jquery.mobile.js'),
				loader: 'imports-loader?this=>window'
			}
		]
	},

	plugins: [
		//new webpack.optimize.UglifyJsPlugin,
		new Html({
			filename: 'pages/index.html',
			template: './resources/views/index.html'
		}),

		new webpack.ProvidePlugin({
			$:        'jquery',
			jQuery:   'jquery',
			React:    'react',
			ReactDOM: 'react-dom'
		})
	]
}