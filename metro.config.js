const crypto = require.resolve("crypto-browserify");
const url = require.resolve("url/");
module.exports = {
	resolver: {
		extraNodeModules: {
			crypto,
			url,
			zlib: require.resolve("browserify-zlib"),
			tty: require.resolve("tty-browserify"),
			fs: require.resolve("expo-file-system"),
			http: require.resolve("stream-http"),
			https: require.resolve("https-browserify"),
			net: require.resolve("react-native-tcp"),
			os: require.resolve("os-browserify/browser.js"),
			path: require.resolve("path-browserify"),
			stream: require.resolve("readable-stream"),
			vm: require.resolve("vm-browserify"),
		},
	},
};
