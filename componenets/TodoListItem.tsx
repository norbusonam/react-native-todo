import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Todo } from '../interfaces/Todo';

export type Props = {
  todo: Todo;
}

const TodoListItem: React.FC<Props> = (props: Props) => {
  return (
    <View style={styles.todoContainer}>
      <Text style={styles.todoText}>{props.todo.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  todoText: {
    fontSize: 18
  }
});

export default TodoListItem;