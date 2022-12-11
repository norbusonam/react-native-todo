import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Footer from './componenets/Footer';
import Header from './componenets/Header';
import TodoList from './componenets/TodoList';
import { Todo } from './interfaces/Todo';
import { LongTodoList, ShortTodoList } from './data/InitialTodoLists';

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

  return (
    <SafeAreaView style={styles.appContainer}>
      <Header />
      <TodoList todos={getTodosToDisplay()} />
      <Footer isViewingCompleted={isViewingCompleted} toggleIsViewingCompleted={toggleIsViewingCompleted}  />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;