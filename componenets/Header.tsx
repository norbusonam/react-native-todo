import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  isViewingCompleted: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{props.isViewingCompleted ? 'Completed' : 'Todo'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Header;