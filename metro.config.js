const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
