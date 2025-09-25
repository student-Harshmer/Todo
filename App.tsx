import { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
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

  const renderTask: ListRenderItem<Task> = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.idText}>Task ID: {item.id}</Text>
        <Text style={styles.taskTitleText}>Title: {item.title}</Text>
      </View>
    );
  };

  const removeItem = (id: number) => {
    const List = task.filter(item => item.id !== id);
    setTask(List);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeAreaStyle}>
        <Text style={styles.titleText}>Todo Screen</Text>
        {/* Add Todo Form Here - Kaushik */}

        {/* Todo List Start here - Harsh */}
        <FlatList
          data={task}
          renderItem={renderTask}
          contentContainerStyle={styles.listStyle}
          showsVerticalScrollIndicator={false}
        />

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
});

export default App;
