import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import Header from './componenets/Header';
import TodoList from './componenets/TodoList';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <Header />
      <TodoList />
      <Button title='New Todo' />
    </SafeAreaView>
  );
}

export default App;