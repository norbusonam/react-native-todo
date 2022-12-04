import React from 'react';
import { FlatList } from 'react-native';
import { Todo } from '../interfaces/Todo';
import TodoListItem from './TodoListItem';

const TodoItems: Todo[] = [
  {
    id: 'a',
    title: 'Get groceries',
    isCompleted: false,
  },
  {
    id: 'b',
    title: 'Finish homework',
    isCompleted: false,
  },
  {
    id: 'c',
    title: 'Apply to jobs',
    isCompleted: false,
  },
]

const TodoList: React.FC = () => {
  return (
    <FlatList data={TodoItems} keyExtractor={(item) => item.id} renderItem={(item) => <TodoListItem todo={item.item} />} />
  );
}

export default TodoList;