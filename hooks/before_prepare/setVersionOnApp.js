#!/usr/bin/env node

var fs = require('fs');
module.exports = function(context) {

	var cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util"),
	ConfigParser = context.requireCordovaModule('cordova-lib/src/configparser/ConfigParser'),
	projectRoot = cordova_util.isCordova(),
	xml = cordova_util.projectConfig(projectRoot),
	cfg = new ConfigParser(xml),
	version = cfg.version();

	fs.writeFileSync(
		context.opts.plugin.dir + '\\www\\getAppVersion.js',
		'exports.getAppVersion = function() { return "' + version + '";};'
	);
};