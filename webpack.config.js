const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
	mode: "development",
	entry: ["react-hot-loader/patch", "./web-app/app.jsx"],
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	devServer: {
		static: "./web-app/",
		compress: true,
		port: 8080,
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: "web-app/index.html" }],
		}),
		new CleanWebpackPlugin(),
	],
};

module.exports = config;
