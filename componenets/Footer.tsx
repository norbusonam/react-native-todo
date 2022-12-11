import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface FooterProps {
  isViewingCompleted: boolean;
  toggleIsViewingCompleted: () => void;
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <View>
      <Button title='New Todo'></Button>
      <Button title={props.isViewingCompleted ? 'Show active' : 'Show completed'} color={props.isViewingCompleted ? 'green' : 'red'} onPress={props.toggleIsViewingCompleted}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
});

export default Footer;