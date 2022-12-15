import React, { useEffect, useState } from 'react';
import { LayoutAnimation, SafeAreaView, StyleProp, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import Footer from './componenets/Footer';
import Header from './componenets/Header';
import TodoList from './componenets/TodoList';
import { Todo } from './interfaces/Todo';
import { StatusBar } from 'expo-status-bar';
import CenteredMessage from './componenets/CenteredMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoListChangeAnimation } from './animations/TodoListChangeAnimation';

const storeTodos = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.log(error);
  }
}

const App: React.FC = () => {

  const colorScheme = useColorScheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isViewingCompleted, setIsViewingCompleted] = useState(false);

  const appContainerStyles: StyleProp<ViewStyle> = [styles.appContainer];
  if (colorScheme === 'dark') {
    appContainerStyles.push(styles.appContainerDark);
  }

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem('todos');
        if (todos) {
          setTodos(JSON.parse(todos));
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);

  // store todos in async storage
  useEffect(() => {
    storeTodos(todos);
  }, [todos]);

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
    LayoutAnimation.configureNext(TodoListChangeAnimation);
  }

  const toggleTodoCompletion = (id: string, isComplete: boolean) => {
    LayoutAnimation.configureNext(TodoListChangeAnimation);
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
    LayoutAnimation.configureNext(TodoListChangeAnimation);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <SafeAreaView style={appContainerStyles}>
      <StatusBar />
      <Header isViewingCompleted={isViewingCompleted}/>
      {
        getTodosToDisplay().length > 0 
          ? <TodoList todos={getTodosToDisplay()} toggleTodoCompletion={toggleTodoCompletion} updateTodoTitle={updateTodoTitle} deleteTodo={deleteTodo} />
          : isViewingCompleted 
            ? <CenteredMessage message='You have not completed any todos. Get to work!' />
            : <CenteredMessage message='You do not have any todos. Press "New Todo" on the bottom left to get started!' />
      }
      <Footer isViewingCompleted={isViewingCompleted} toggleIsViewingCompleted={toggleIsViewingCompleted} createNewTodo={createNewTodo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  appContainerDark: {
    backgroundColor: 'black',
  },
});

export default App;