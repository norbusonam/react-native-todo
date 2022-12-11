import React from 'react';
import { FlatList } from 'react-native';
import { Todo } from '../interfaces/Todo';
import TodoListItem from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <FlatList data={props.todos} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoListItem todo={item} />} />
  );
}

export default TodoList;