import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Footer from './componenets/Footer';
import Header from './componenets/Header';
import TodoList from './componenets/TodoList';
import { Todo } from './interfaces/Todo';
import { LongTodoList, ShortTodoList } from './data/InitialTodoLists';
import { StatusBar } from 'expo-status-bar';

const App: React.FC = () => {

  const [todos, setTodos] = useState(LongTodoList);
  const [isViewingCompleted, setIsViewingCompleted] = useState(false);

  const getTodosToDisplay = (): Todo[] => {
    return isViewingCompleted ?
      todos.filter((todo) => todo.isCompleted) :
      todos.filter((todo) => !todo.isCompleted)
  }

  const toggleIsViewingCompleted = () => {
    setIsViewingCompleted((prev) => !prev);
  }

  const createNewTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  }

  const toggleTodoCompletion = (id: string, isComplete: boolean) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: isComplete
        }
      }
      return todo;
    }));
  }

  const updateTodoTitle = (id: string, title: string) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }
      return todo;
    }));
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar />
      <Header isViewingCompleted={isViewingCompleted}/>
      <TodoList todos={getTodosToDisplay()} toggleTodoCompletion={toggleTodoCompletion} updateTodoTitle={updateTodoTitle} deleteTodo={deleteTodo} />
      <Footer isViewingCompleted={isViewingCompleted} toggleIsViewingCompleted={toggleIsViewingCompleted} createNewTodo={createNewTodo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;