// ChatSpeech is a chat bubble component that adapts style based on the SENDER.
// It displays a message inside a styled container: one style for the current user and another for the other user that's sending the message.
//------------------------------------------------------------------// 

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

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
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  myBubble: {
    backgroundColor: Colors.blueColor,
  },
  text: {
    fontSize: wp('4%'),
  },
  myText: {
    color: 'white',
  },
});
