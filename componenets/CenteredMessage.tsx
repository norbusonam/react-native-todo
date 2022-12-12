import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CenteredMessageProps {
  message: string;
}

const CenteredMessage: React.FC<CenteredMessageProps> = (props) => {
  return (
    <View style={styles.centeredMessageWrapper}>
      <Text style={styles.messageText}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredMessageWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center'
  }
});

export default CenteredMessage;