import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, useColorScheme, View } from 'react-native';

interface HeaderProps {
  isViewingCompleted: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {

  const colorScheme = useColorScheme();
  
  const headerTextStyles: StyleProp<TextStyle> = [styles.headerText];
  if (colorScheme === 'dark') {
    headerTextStyles.push(styles.headerTextDark);
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={headerTextStyles}>{props.isViewingCompleted ? 'Completed' : 'Todo'}</Text>
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
  headerTextDark: {
    color: 'white',
  },
});

export default Header;