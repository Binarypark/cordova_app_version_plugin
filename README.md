cordova_app_version_plugin
==========================

This plugin reads the version of your app that you put in config.xml and makes it available inside your app via Javascript. 

**This plugin should work on any platform since it does not rely on any native code.**

## Installation
### Cordova CLI
```
cordova plugin add org.binarypark.cordova.plugins.version
```
The plugin will then be accessable via `window.cordova.plugins.getAppVersion()`.

## Usage
### config.xml example
```
<?xml version='1.0' encoding='utf-8'?>
<widget id="my.app.id" version="1.5.0">...</widget>

```
A call `window.cordova.plugins.getAppVersion()` will return the version `"1.5.0"`.

## How does it work?
The plugins uses the `before_prepare` hook to generate the `getAppVersion.js` file which will be added to the App on build. The `getAppVersion.js` file which comes with the plugin is just a placeholder, as it should be available when the plugin is installed.

** Since `getAppVersion.js` is regenerated on every build, you should not add it under version control!**