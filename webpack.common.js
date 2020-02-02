const path = require('path');

module.exports = {
	entry: {
		index: [ '@babel/polyfill', './src/js/index' ]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
