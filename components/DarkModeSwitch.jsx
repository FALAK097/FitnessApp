import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from './ThemeContext';

const DarkModeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return <Switch value={isDarkMode} onValueChange={toggleTheme} />;
};

export default DarkModeSwitch;
