import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp, TextStyle, LayoutAnimation, LayoutAnimationConfig, Alert, useColorScheme } from 'react-native';
import { Todo } from '../interfaces/Todo';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons'; 

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
  deleteTodo: (id: string) => void;
}

const TodoListItem: React.FC<Props> = (props: Props) => {
  
  const [isPendingComplete, setIsPendingComplete] = useState(false);
  const [isPendingReactivate, setIsPendingReactivate] = useState(false);
  const colorScheme = useColorScheme();

  const todoTextStyles: StyleProp<TextStyle> = [styles.todoText];
  if (props.todo.isCompleted) {
    todoTextStyles.push(styles.todoComplete);
  }
  if (isPendingComplete) {
    todoTextStyles.push(styles.todoPendingComplete);
  }
  if (isPendingReactivate) {
    todoTextStyles.push(styles.todoPendingReactivate);
  }
  if (colorScheme === 'dark') {
    todoTextStyles.push(styles.todoTextDark);
  }

  const todoContainerStyles: StyleProp<TextStyle> = [styles.todoContainer];
  if (colorScheme === 'dark') {
    todoContainerStyles.push(styles.todoContainerDark);
  }

  const handleLongPressTodo = () => {
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

  const handlePressTodo = () => {
    if (!isPendingComplete && !isPendingReactivate && !props.todo.isCompleted) {
      Alert.prompt('Edit Todo', 'Enter a new title', (title) => {
        title = title.trim();
        if (title && title.length > 0) props.updateTodoTitle(props.todo.id, title);
        else Alert.alert('Invalid todo', 'Todo title cannot be empty!');
      }, undefined, props.todo.title);
    }
  }

  const handlePressTrash = () => {
    props.deleteTodo(props.todo.id);
    LayoutAnimation.configureNext(layoutAnimConfig);
  }

  return (
    <View style={todoContainerStyles}>
      <Text style={todoTextStyles} onLongPress={handleLongPressTodo} onPress={handlePressTodo}>{props.todo.title}</Text>
      {props.todo.isCompleted && !isPendingReactivate && (
        <Feather name="trash" size={20} color="red" onPress={handlePressTrash} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  todoContainerDark: {
    borderColor: 'slategray',
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
    fontSize: 18,
    flexGrow: 1,
  },
  todoTextDark: {
    color: 'white',
  },
});

export default TodoListItem;