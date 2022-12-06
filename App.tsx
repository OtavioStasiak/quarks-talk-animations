import { StyleSheet } from 'react-native';
import { QuestionProvider } from './src/hooks';
import { Routes } from './src/routes';

export default function App() {
  return (
    <QuestionProvider>
      <Routes />
    </QuestionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
