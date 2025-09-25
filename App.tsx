/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: number;
  title: string;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [task, setTask] = useState<Task[]>([]);
  const [search, setSearch] = useState('');

  const addTaskHandler = (todo: Task) => {
    const newTask: Task = {
      id: Date.now(),
      title: search,
    };
    setTask([...task, newTask]);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeAreaStyle}>
        <Text style={styles.titleText}>Todo Screen</Text>
        {/* Add Todo Form Here - Kaushik */}

        {/* Todo List Start here - Harsh */}

        {/* Todo List End Here here */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;
