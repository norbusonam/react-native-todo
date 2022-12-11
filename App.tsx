import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Footer from './componenets/Footer';
import Header from './componenets/Header';
import TodoList from './componenets/TodoList';
import { Todo } from './interfaces/Todo';


const TodoItems: Todo[] = [
  {
    id: 'a',
    title: 'Get groceries',
    isCompleted: false,
  },
  {
    id: 'b',
    title: 'Finish homework',
    isCompleted: true,
  },
  {
    id: 'c',
    title: 'Apply to jobs',
    isCompleted: false,
  },
  {
    id: 'd',
    title: 'Study for exams',
    isCompleted: false,
  },
]

const App: React.FC = () => {

  const [isViewingCompleted, setIsViewingCompleted] = useState(false);

  const getTodosToDisplay = (): Todo[] => {
    return isViewingCompleted ?
      TodoItems.filter((todo) => todo.isCompleted) :
      TodoItems.filter((todo) => !todo.isCompleted)
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