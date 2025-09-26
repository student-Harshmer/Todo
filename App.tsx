/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
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
  description: string;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [addTask, setAddTask] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [task, setTask] = useState<Task[]>([]);
  const [section, setSection] = useState(0);
  const [removedTask, setRemovedTask] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);

  const addTaskHandler = () => {
    if (addTask.trim().length > 0 && addDescription.trim().length > 0) {
      const newTask: Task = {
        id: Date.now(),
        title: addTask,
        description: addDescription,
      };
      setTask([...task, newTask]);
      setAddTask('');
      setAddDescription('');
    }
  };

  const removeTask = (id: number) => {
    const list = task.filter(item => item.id !== id);
    setTask(list);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        // Load 'AllTodos'
        const storedTodos = await AsyncStorage.getItem('AllTodos');
        if (storedTodos !== null) {
          setTask(JSON.parse(storedTodos));
        }
        // Load 'RemovedTodos'
        const storedRemoved = await AsyncStorage.getItem('RemovedTodos');
        if (storedRemoved !== null) {
          setRemovedTask(JSON.parse(storedRemoved));
        }
        // Load 'Completed'
        const storedCompleted = await AsyncStorage.getItem('Completed');
        if (storedCompleted !== null) {
          setCompletedTask(JSON.parse(storedCompleted));
        }
      } catch (e) {
        console.error('Error loading data:', e);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const allTodos = JSON.stringify(task);
    const removedTodos = JSON.stringify(removedTask);
    const completedTodos = JSON.stringify(completedTask);
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('AllTodos', allTodos);
        await AsyncStorage.setItem('RemovedTodos', removedTodos);
        await AsyncStorage.setItem('Completed', completedTodos);
      } catch (e) {
        console.error('Error saving string data:', e);
      }
    };
    saveTodos();
  }, [task, removedTask, completedTask]);


  const RenderTask = ({ item }: { item: Task }) => {
    const [isCompleted, setisCompleted] = useState(false);
    const completedTaskHandler = () => {
      if (isCompleted) {
        setCompletedTask([...completedTask, item]);
      } else {
        setCompletedTask(completedTask.filter(x => x.id !== item.id));
      }
    }

    return (
      <View style={styles.listContainer}>
        <TouchableOpacity
          onPress={() => {
            setisCompleted(!isCompleted);
            completedTaskHandler();
          }}
          style={[styles.checkBox]}
        >
          <Text>{isCompleted ? '✅' : '☑️'}</Text>
        </TouchableOpacity>
        <View style={styles.taskContainer}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.taskTitleText,
                { textDecorationLine: isCompleted ? 'line-through' : 'none' },

                { color: isCompleted ? 'lightgreen' : '#fff' },
              ]}
            >
              Title: {item.title}
            </Text>
            <Text
              style={styles.descText}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              Description: {item.description}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => removeTask(item.id)}
            style={styles.removeButton}
          >
            <Text>❌</Text>
          </TouchableOpacity>
        </View>
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
            style={[styles.input, { padding: 10 }]}
            returnKeyLabel="return"
          />
          <TextInput
            value={addDescription}
            onChangeText={setAddDescription}
            keyboardAppearance="dark"
            placeholder="Add description"
            placeholderTextColor={'gray'}
            style={[styles.input, { height: 70, padding: 5 }]}
            returnKeyLabel="return"
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTaskHandler}>
            <Text style={styles.btnText}>Add task</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => {
              setSection(0);
            }}
            style={[
              { borderBottomColor: section === 0 ? 'green' : '' },
              { borderBottomWidth: section === 0 ? 2 : 0 },

              styles.categotyButton,
            ]}
          >
            <Text style={styles.categoryName}>All tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSection(1);
            }}
            style={[
              { borderBottomColor: section === 1 ? 'green' : '' },
              { borderBottomWidth: section === 1 ? 2 : 0 },

              styles.categotyButton,
            ]}
          >
            <Text style={styles.categoryName}>Completed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSection(2);
            }}
            style={[
              { borderBottomColor: section === 2 ? 'green' : '' },
              { borderBottomWidth: section === 2 ? 2 : 0 },
              styles.categotyButton,
            ]}
          >
            <Text style={styles.categoryName}>Removed</Text>
          </TouchableOpacity>
        </View>

        {section === 0 && (
          <FlatList
            data={task}
            renderItem={({ item }) => <RenderTask item={item} />}
            contentContainerStyle={styles.listStyle}
            showsVerticalScrollIndicator={false}
          />
        )}
        {section === 1 && (
          <FlatList
            data={completedTask}
            renderItem={({ item }) => <RenderTask item={item} />}
            contentContainerStyle={styles.listStyle}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listStyle: {
    gap: 7,
    paddingHorizontal: 10,
  },
  taskContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    width: '90%',
  },
  textContainer: {
    width: '75%',
    gap: 5,
  },
  taskTitleText: {
    fontSize: 17,
    fontWeight: 500,
  },
  descText: {
    color: '#fff',
  },
  idText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 500,
  },
  removeButton: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  inputContainer: {
    width: '100%',
    gap: 10,
    marginHorizontal: 16,
    paddingVertical: 20,
    alignSelf: 'center',
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
    width: '90%',
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categotyButton: {
    padding: 5,
  },
});

export default App;
