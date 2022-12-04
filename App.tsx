import { StyleSheet, View } from 'react-native';
import Header from './componenets/Header';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 10,
  },
});
