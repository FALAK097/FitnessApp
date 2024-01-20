import { ThemeProvider } from './components/ThemeContext';
import { AppNavigation } from './navigation/appNavigation';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />

    </ThemeProvider>
  );
}
