import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Todo } from '../interfaces/Todo';
import TodoListItem from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodoCompletion: (id: string, isComplete: boolean) => void;
  updateTodoTitle: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <FlatList style={styles.todoListContainer} data={props.todos} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoListItem todo={item} toggleTodoCompletion={props.toggleTodoCompletion} updateTodoTitle={props.updateTodoTitle} deleteTodo={props.deleteTodo} />} />
  );
}

const styles = StyleSheet.create({
  todoListContainer: { 
    flexGrow: 1,
  }
});

export default TodoList;