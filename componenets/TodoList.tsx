import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Todo } from '../interfaces/Todo';
import TodoListItem from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodoCompletion: (id: string, isComplete: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <View style={styles.todoListContainer}>
      <FlatList data={props.todos} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoListItem todo={item} toggleTodoCompletion={props.toggleTodoCompletion}/>} />
    </View>
  );
}

const styles = StyleSheet.create({
  todoListContainer: { 
    flexGrow: 1,
  }
});

export default TodoList;