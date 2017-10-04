
module.exports = function(env: any) {
	if (env === "umd") {
		// tslint:disable-next-line:no-console
		console.log("@@@@@@@@@@ Running DLL Build @@@@@@@@@@");
		return require("./config/webpack.umd");
	}
};

