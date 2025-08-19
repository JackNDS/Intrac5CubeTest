const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// Generate HTML pages from views folder
function generateHtmlPlugins(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map((item) => {
		const [name, extension] = item.split(".");
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: true,
		});
	});
}

const htmlPlugins = generateHtmlPlugins("./src/html/views");

const config = {
	entry: [
		"./src/js/index.js",      // JS entry point (Flowbite init, etc.)
		"./src/css/tailwind.css", // Tailwind CSS entry
	],
	output: {
		filename: "./js/bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "source-map",
	mode: "production",
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: true,
			}),
		],
	},
	module: {
		rules: [
			// Tailwind + normal CSS
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { importLoaders: 1 } },
					"postcss-loader", // Uses postcss.config.js
				],
			},

			// HTML includes
			{
				test: /\.html$/,
				include: path.resolve(__dirname, "src/html/includes"),
				use: ["raw-loader"],
			},

			// JS via Babel
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/style.bundle.css",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "./src/fonts", to: "./fonts" },
				{ from: "./src/favicon", to: "./favicon" },
				{ from: "./src/img", to: "./img" },
				{ from: "./src/icons", to: "./icons" },
				{ from: "./static/robots.txt", to: "./" },
			],
		}),
		...htmlPlugins,
	],
};

module.exports = (env, argv) => {
	if (argv.mode === "production") {
		config.plugins.push(new CleanWebpackPlugin());
	}
	return config;
};
