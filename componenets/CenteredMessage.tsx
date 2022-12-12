import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, useColorScheme, View } from 'react-native';

interface CenteredMessageProps {
  message: string;
}

const CenteredMessage: React.FC<CenteredMessageProps> = (props) => {

  const colorScheme = useColorScheme();

  const messageTextStyles: StyleProp<TextStyle> = [styles.messageText];
  if (colorScheme === 'dark') {
    messageTextStyles.push(styles.messageTextDark);
  }

  return (
    <View style={styles.centeredMessageWrapper}>
      <Text style={messageTextStyles}>{props.message}</Text>
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
  },
  messageTextDark: {
    color: 'white'
  },
});

export default CenteredMessage;