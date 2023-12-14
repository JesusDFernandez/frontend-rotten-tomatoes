import { StatusBar } from 'react-native';
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import { Navigation } from './Navigation';
import { MoviesProvider } from './src/context/moviesContext';
import { AuthProvider } from './src/context/authContext';
import { SeriesProvider } from './src/context/seriesContext';
import { CommentProvider } from './src/context/commentsContext';

export default function App() {

  return (
    <>
      <SafeAreaProvider>
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <AuthProvider>
          <MoviesProvider>
            <SeriesProvider>
              <CommentProvider>
                <Navigation />
              </CommentProvider>
            </SeriesProvider>
          </MoviesProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
}
