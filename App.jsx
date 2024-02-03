import { LogBox } from 'react-native';
import { Suspense } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { AppNavigation } from './navigation/appNavigation';
import { ActivityIndicator } from 'react-native';

LogBox.ignoreLogs(['Warning: ViewPropTypes', 'Warning: Failed prop type']);

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<ActivityIndicator size="large" color="#877dfa" />}>
        <AppNavigation />
      </Suspense>
    </ThemeProvider>
  );
}
