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
      title = title.trim();
      if (title && title.length > 0) {
        props.createNewTodo({
          title,
          isCompleted: false,
          id: Math.random().toString(),
        });
      } else { 
        Alert.alert('Invalid todo', 'Todo title cannot be empty!');
      }
    });
  }

  return (
    <View style={styles.footerContainer}>
      <Button title='New Todo' onPress={promptNewTodo} disabled={props.isViewingCompleted}></Button>
      <Button title={props.isViewingCompleted ? 'Show Active' : 'Show Completed'} color={props.isViewingCompleted ? 'green' : 'red'} onPress={props.toggleIsViewingCompleted}></Button>
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