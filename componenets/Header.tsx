import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Todo</Text>
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