import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Todo } from '../interfaces/Todo';
import TodoListItem from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  completeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <View style={styles.todoListContainer}>
      <FlatList data={props.todos} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoListItem todo={item} completeTodo={props.completeTodo}/>} />
    </View>
  );
}

const styles = StyleSheet.create({
  todoListContainer: { 
    flexGrow: 1,
  }
});

export default TodoList;