cordova_app_version_plugin
==========================

This plugin reads the version of your app that you put in config.xml and makes it available inside your app via Javascript.

**This plugin should work on any platform since it does not rely on any native code.**

## Changelog
* 0.2.7
  * Added support for `cordova@>9.0.0`. Thanks to [@lyudmil](https://github.com/Binarypark/cordova_app_version_plugin/pull/4) 
* 0.2.6
  * switched from plain `fs` to `q-io` for better promise handling
  * fixed error under `cordova@>5.0.0` when adding platform and expected directory structure does not exist
* 0.2.2
  * updated `before_prepare` hook to work with `cordova@>5.0.0`
* 0.1.0
  * Added namespace `version` to not override other plugins see [issue 2](https://github.com/Binarypark/cordova_app_version_plugin/issues/2) <br/> Call to retrieve the appVersion is now: `window.cordova.plugins.version.getAppVersion()`
* 0.0.4
  * Changed directory separators from `\\`to `/` see [issue 1](https://github.com/Binarypark/cordova_app_version_plugin/issues/1)

## Installation
### Cordova CLI
```
npm install q-io
cordova plugin add cordova_app_version_plugin
```

The plugin will then be accessable via `window.cordova.plugins.version.getAppVersion()`.

## Usage
### config.xml example
```
<?xml version='1.0' encoding='utf-8'?>
<widget id="my.app.id" version="1.5.0">...</widget>

```
A call `window.cordova.plugins.version.getAppVersion()` will return the version `"1.5.0"`.

## How does it work?
The plugins uses the `before_prepare` hook to generate the `getAppVersion.js` file which will be added to the App on build. The `getAppVersion.js` file which comes with the plugin is just a placeholder, as it should be available when the plugin is installed.

**Since `getAppVersion.js` is regenerated on every build, you should not add it under version control!**
