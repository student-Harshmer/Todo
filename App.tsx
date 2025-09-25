/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: number;
  title: string;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [task, setTask] = useState<Task[]>([]);
  const [search, setSearch] = useState('');

  const addTaskHandler = () => {
    const newTask: Task = {
      id: Date.now(),
      title: search,
    };
    setTask([...task, newTask]);
    setSearch('');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeAreaStyle}>
        <Text style={styles.titleText}>Todo Screen</Text>
        {/* Add Todo Form Here - Jigar */}
        <View style={styles.inputContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            keyboardAppearance="dark"
            placeholder="Add task"
            placeholderTextColor={'gray'}
            style={styles.input}
            returnKeyLabel="return"
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTaskHandler}>
            <Text style={styles.btnText}>Add task</Text>
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: { borderColor: 'gray', padding: 10, borderRadius: 8, borderWidth: 2 },
  btnText: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#ccc',
    width: '75%',
    padding: 10,
  },
});

export default App;
