module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      'expo-router/babel',
      'nativewind/babel',
      'react-native-reanimated/plugin',
      'react-native-paper/babel',
    ],
  };
};
