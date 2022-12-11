import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp, TextStyle, LayoutAnimation, LayoutAnimationConfig, Alert } from 'react-native';
import { Todo } from '../interfaces/Todo';
import * as Haptics from 'expo-haptics';

const layoutAnimConfig: LayoutAnimationConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut, 
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export type Props = {
  todo: Todo;
  toggleTodoCompletion: (id: string, isComplete: boolean) => void;
  updateTodoTitle: (id: string, title: string) => void;
}

const TodoListItem: React.FC<Props> = (props: Props) => {

  const [isPendingComplete, setIsPendingComplete] = useState(false);
  const [isPendingReactivate, setIsPendingReactivate] = useState(false);

  const todoStyles: StyleProp<TextStyle> = [styles.todoText];
  if (props.todo.isCompleted) {
    todoStyles.push(styles.todoComplete);
  }
  if (isPendingComplete) {
    todoStyles.push(styles.todoPendingComplete);
  }
  if (isPendingReactivate) {
    todoStyles.push(styles.todoPendingReactivate);
  }

  const handleLongPress = () => {
    // check if action is already pending
    if (!isPendingComplete && !isPendingReactivate) {
      // complete todo
      if (!props.todo.isCompleted) {
        setIsPendingComplete(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => {
          props.toggleTodoCompletion(props.todo.id, true);
          setIsPendingComplete(false);
          LayoutAnimation.configureNext(layoutAnimConfig);
        }, 1500);
      // reactivate todo
      } else {
        setIsPendingReactivate(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setTimeout(() => {
          props.toggleTodoCompletion(props.todo.id, false);
          setIsPendingReactivate(false);
          LayoutAnimation.configureNext(layoutAnimConfig);
        }, 1500);
      }
    }
  }

  const handlePress = () => {
    if (!isPendingComplete && !isPendingReactivate && !props.todo.isCompleted) {
      Alert.prompt('Edit Todo', 'Enter a new title', (title) => {
        props.updateTodoTitle(props.todo.id, title);
      }, undefined, props.todo.title);
    }
  }

  return (
    <View style={styles.todoContainer}>
      <Text style={todoStyles} onLongPress={handleLongPress} onPress={handlePress}>{props.todo.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  todoComplete: {
    textDecorationLine: 'line-through'
  },
  todoPendingComplete: {
    textDecorationLine: 'line-through',
    color: 'red'
  },
  todoPendingReactivate: {
    textDecorationLine: 'none',
    color: 'green'
  },
  todoText: {
    fontSize: 18
  }
});

export default TodoListItem;