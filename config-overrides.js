const path = require('path');
const { paths } = require('react-app-rewired');

module.exports = {
  webpack: function (config, env) {
    if(env === 'production') {
      config.module.rules[1].oneOf[1].include = [
        paths.appSrc,
        path.resolve(paths.appNodeModules, 'bitcoinjs-lib'),
        path.resolve(paths.appNodeModules, 'tiny-secp256k1'),
        path.resolve(paths.appNodeModules, 'jsontokens'),
        path.resolve(paths.appNodeModules, 'bip32'),
        path.resolve(paths.appNodeModules, 'base64url'),
        path.resolve(paths.appNodeModules, 'typeforce')
      ];
    }
    return config;
  },
  jest: function (config) {
    return config;
  },
  // configFunction is the original react-scripts function that creates the
  // Webpack Dev Server config based on the settings for proxy/allowedHost.
  // react-scripts injects this into your function (so you can use it to
  // create the standard config to start from), and needs to receive back a
  // function that takes the same arguments as the original react-scripts
  // function so that it can be used as a replacement for the original one.
  devServer: function (configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // Edit config here - example: set your own certificates.
      //
      // const fs = require('fs');
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS
      // };
			config.headers = {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				"Access-Control-Allow-Headers": "Content-Type"
			}

      return config;
    };
  }
}
