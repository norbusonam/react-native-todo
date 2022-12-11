import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp, TextStyle } from 'react-native';
import { Todo } from '../interfaces/Todo';

export type Props = {
  todo: Todo;
  completeTodo: (id: string) => void;
}

const TodoListItem: React.FC<Props> = (props: Props) => {

  const [isPendingComplete, setIsPendingComplete] = useState(false);

  const todoStyles: StyleProp<TextStyle> = [styles.todoText];
  if (isPendingComplete || props.todo.isCompleted) {
    todoStyles.push(styles.todoComplete);
  }

  const handleLongPress = () => {
    if (!props.todo.isCompleted) {
      setIsPendingComplete(true);
      setTimeout(() => {
        props.completeTodo(props.todo.id);
      }, 3000);
    }
  }

  return (
    <View style={styles.todoContainer}>
      <Text style={todoStyles} onLongPress={handleLongPress}>{props.todo.title}</Text>
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
  todoText: {
    fontSize: 18
  }
});

export default TodoListItem;