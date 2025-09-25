import { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
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
  const [task, setTask] = useState<Task[]>([
    { id: 1, title: 'Learn Zustand' },
    { id: 2, title: 'Learn git and github' },
    { id: 3, title: 'Learn git and github' },
    { id: 4, title: 'Learn git and github' },
    { id: 5, title: 'Learn git and github' },
    { id: 6, title: 'Learn git and github' },
    { id: 7, title: 'Learn git and github' },
    { id: 8, title: 'Learn git and github' },
    { id: 9, title: 'Learn git and github' },
    { id: 10, title: 'Learn git and github' },
    { id: 11, title: 'Learn git and github' },
  ]);

  const removeTask = (id: number) => {
    const list = task.filter(item => item.id !== id);
    setTask(list);
  };

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
});

export default App;
