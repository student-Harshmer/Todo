import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: number;
  title: string;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [addTask, setAddTask] = useState('');
  const [task, setTask] = useState<Task[]>([]);
  const [taskID, setTaskID] = useState(0);
  const [removedTask, setRemovedTask] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);

  const addTaskHandler = () => {
    setTaskID(prev => prev + 1);
    const newTask: Task = {
      id: taskID,
      title: addTask,
    };
    setTask([...task, newTask]);
    setAddTask('');
  };

  const removeTask = (id: number) => {
    const list = task.filter(item => item.id !== id);
    setTask(list);
  };

  useEffect(() => {
    const allTodos = JSON.stringify(task);
    const removedTodos = JSON.stringify(removedTask);
    const completedTodos = JSON.stringify(completedTask);
    const saveStringData = async () => {
      try {
        await AsyncStorage.setItem('AllTodos', allTodos);
        await AsyncStorage.setItem('RemovedTodos', removedTodos);
        await AsyncStorage.setItem('Completed', completedTodos);
      } catch (e) {
        console.error('Error saving string data:', e);
      }
    };
    saveStringData();
  });

  const renderTask: ListRenderItem<Task> = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <View>
          <Text style={styles.idText}>Task ID: {item.id}</Text>
          <Text style={styles.taskTitleText}>Title: {item.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeTask(item.id)}
          style={styles.removeButton}
        >
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeAreaStyle}>
        <Text style={styles.titleText}>Todo Screen</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={addTask}
            onChangeText={setAddTask}
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
        <FlatList
          data={task}
          renderItem={renderTask}
          contentContainerStyle={styles.listStyle}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  listStyle: {
    gap: 7,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  taskContainer: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitleText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 17,
    fontWeight: 500,
  },
  idText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 500,
  },
  removeButton: {
    backgroundColor: 'red',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    gap: 10,
    marginHorizontal: 16,
    paddingVertical: 20,
    alignSelf: 'center',
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
