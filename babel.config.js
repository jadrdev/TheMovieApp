module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // Añadimos el código para React Native Paper
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
