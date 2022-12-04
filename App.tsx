import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QuestionProvider } from './src/hooks';
import { Dropdown } from './src/screens/Dropdown';
import { FloatButton } from './src/screens/FloatButton';
import { List } from './src/screens/List';

export default function App() {
  return (
    <QuestionProvider>
      <FloatButton />
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
