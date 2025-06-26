// ChatSpeech is a chat bubble component that adapts style based on the SENDER.
// It displays a message inside a styled container: one style for the current user and another for the other user that's sending the message.
//------------------------------------------------------------------// 

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const ChatSpeech = ({ message, isCurrentUser }) => {
  return (
    <View style={[
      styles.bubble,
      isCurrentUser ? styles.myBubble : styles.otherBubble
    ]}>
      <Text style={[
        styles.text,
        isCurrentUser ? styles.myText : {}
      ]}>
        {message}
      </Text>
    </View>
  );
}

export default ChatSpeech;

const styles = StyleSheet.create({
  bubble: {
    maxWidth: wp('70%'),
    paddingVertical: Metrics.marginM,
    paddingHorizontal: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    marginLeft: Metrics.marginS,
    marginRight: Metrics.marginS,
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: Metrics.marginXS,
  },
  myBubble: {
    backgroundColor: Colors.blueColor,
  },
  text: {
    fontSize: Metrics.fontS,
  },
  myText: {
    color: Colors.whiteColor,
  },
});
