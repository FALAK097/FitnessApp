import { LogBox } from 'react-native';
import { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ActivityIndicator } from 'react-native';
import { AvatarProvider } from './context/AvatarContext';
import { AppNavigation } from './navigation/appNavigation';

//const AppNavigation = lazy(() => import('./navigation/appNavigation'));

LogBox.ignoreLogs(['Warning: ViewPropTypes', 'Warning: Failed prop type']);

export default function App() {
  return (
    <AvatarProvider>
      <ThemeProvider>
        <Suspense fallback={<ActivityIndicator size="large" color="#877dfa" />}>
          <AppNavigation />
        </Suspense>
      </ThemeProvider>
    </AvatarProvider>
  );
}
