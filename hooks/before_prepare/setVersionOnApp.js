#!/usr/bin/env node
module.exports = function(context) {

	var fs = require('q-io/fs');
	var q = require('q');
	var semver = require('semver');

	var ConfigParser = context.requireCordovaModule('cordova-lib').configparser;
	var cfg = new ConfigParser(fs.join(context.opts.projectRoot, 'config.xml'));
	var version = cfg.version();

	/**
	 * after version 5 the plugins are not anymore re-copied into the respective platform folder
	 * on every build
	 */
	if(semver.lt(context.opts.cordova.version, '5.0.0')) {

		return fs.write(
			fs.join(context.opts.plugin.dir, '/www/getAppVersion.js'),
			'module.exports.getAppVersion = function() { return "' + version + '";};'
		);
	}

	var pathParts = [
		'platform_www/plugins',
		context.opts.plugin.id,
		'www',
	];

	var commonPathParts = [
		context.opts.projectRoot,
		'platforms',
	];

	var basePath = fs.join.apply(undefined, commonPathParts);
	var pluginPath = fs.join.apply(undefined, pathParts);

	function writeWrapper(platformName) {

		var fullPath = fs.join(
			basePath,
			platformName,
			pluginPath
		);

		function writeFile() {

			return fs.write(
				fs.join(fullPath, 'getAppVersion.js'),
				'cordova.define("cordova_app_version_plugin.getAppVersion", function(require, exports, module) { module.exports.getAppVersion = function() { return "' + version + '";};});'
			);
		}

		return fs.exists(fullPath).then(function(pathExists) {

			if(pathExists) {
				return writeFile();
			}

			return fs.makeTree(fullPath).then(writeFile);
		}).catch(function(err) {

				throw(err);
		});
	}

	function createWriteCallbacks(platforms) {

		return platforms.map(function(platformName) {

			return writeWrapper(platformName);
		});
	}

	return q.all(createWriteCallbacks(context.opts.platforms));
};
