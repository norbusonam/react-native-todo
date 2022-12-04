import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View>
      <Text style={styles.header}>Todo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 16,
  },
});
