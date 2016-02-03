#!/usr/bin/env node


module.exports = function(context) {

	var fs = context.requireCordovaModule('fs');
	var path = context.requireCordovaModule('path');
	var q = context.requireCordovaModule('q');
	var writeFile = q.denodeify(fs.writeFile);
	var semver = context.requireCordovaModule('semver');

	var ConfigParser = context.requireCordovaModule('cordova-lib').configparser;
	var cfg = new ConfigParser(path.join(context.opts.projectRoot, 'config.xml'));
	var version = cfg.version();

	/* after version 5 the plugins are not anymore re-copied into the respective platform folder
	 * on every build
	 */
	if(semver.lt(context.opts.cordova.version, '5.0.0')) {

		return writeFile(
			context.opts.plugin.dir + '/www/getAppVersion.js',
			'module.exports.getAppVersion = function() { return "' + version + '";};'
		);
	}

	function writeWrapper(platformName) {

		return writeFile(
			path.join(
				context.opts.projectRoot,
				'platforms',
				platformName,
				'platform_www/plugins',
				context.opts.plugin.id,
				'www/getAppVersion.js'
			),
			'cordova.define("org.binarypark.cordova.plugins.version.getAppVersion", function(require, exports, module) { module.exports.getAppVersion = function() { return "' + version + '";};});'
		);
	}
	
	function createWriteCallbacks(platforms) {

		return platforms.map(function(platformName) {

			return writeWrapper(platformName);
		});
	}

	return q.all(createWriteCallbacks(context.opts.platforms));
};