const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyFilePlugin = require('webpack-copy-file-plugin');

const tsConfig = require('./tsconfig.json')
const fs = require('fs')

function parseTsConfigPaths(tsConfig) {
	const { paths, baseUrl } = tsConfig.compilerOptions
	const alias = {};
	if (paths) {
		for (const aliasPath in paths) {
			const key = aliasPath.replace(/\/\*$/, '')
			const value = paths[aliasPath][0].replace(/\/\*$/, '');
			alias[key] = path.resolve(__dirname, baseUrl, value);
		}
	}
	return alias;
}

module.exports = {
	// development
	// production 将打包压缩
	mode: 'production',
	entry: {
		waterfall: path.resolve(__dirname, 'src/index.ts'),
	},
	// 去掉map，减少打包体积
	// devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],

		// 如果要配置路径别名，就在/tsconfig.json里面配置
		alias: {
			...parseTsConfigPaths(tsConfig)
		}
	},
	optimization: {
		minimizer: [new TerserJSPlugin({})],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyFilePlugin(['./README.md', './LICENSE', './package.json', './.gitignore'].map(f => path.resolve(__dirname, f))),
		new HtmlWebpackPlugin({
			template: 'example/index.html',
			inject: false,
		}),
	],
	output: {
		library: "waterfall",
		libraryTarget: 'umd',
		filename: '[name].js',
		publicPath: './',
		path: path.resolve(__dirname, tsConfig.compilerOptions.outDir),
	},
};