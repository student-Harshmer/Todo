import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style';

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

type Props = {
  item: Task;
  onComplete: () => void;
  onDelete: () => void;
}

const RenderTask = ({ item, onComplete, onDelete }: Props) => {
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity onPress={onComplete} style={[styles.checkBox]}>
        <Text>{item.isCompleted ? '✅' : '☑️'}</Text>
      </TouchableOpacity>
      <View style={styles.taskContainer}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.taskTitleText,
              { textDecorationLine: item.isCompleted ? 'line-through' : 'none' },
              { color: item.isCompleted ? 'lightgreen' : '#fff' },
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
          onPress={onDelete}
          style={styles.removeButton}
        >
          <Text>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RenderTask;