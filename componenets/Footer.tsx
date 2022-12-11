import React from 'react';
import { Button, StyleSheet, View, Alert } from 'react-native';
import { Todo } from '../interfaces/Todo';

interface FooterProps {
  isViewingCompleted: boolean;
  toggleIsViewingCompleted: () => void;
  createNewTodo: (todo: Todo) => void;
}

const Footer: React.FC<FooterProps> = (props) => {

  const promptNewTodo = () => {
    Alert.prompt('New todo', 'Enter title', (title) => {
      props.createNewTodo({
        title,
        isCompleted: false,
        id: Math.random().toString(),
      });
    });
  }

  return (
    <View style={styles.footerContainer}>
      <Button title='New Todo' onPress={promptNewTodo} disabled={props.isViewingCompleted}></Button>
      <Button title={props.isViewingCompleted ? 'Show active' : 'Show completed'} color={props.isViewingCompleted ? 'green' : 'red'} onPress={props.toggleIsViewingCompleted}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Footer;