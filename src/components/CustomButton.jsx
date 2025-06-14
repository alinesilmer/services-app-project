// CustomButtom builds a button that receives text and onPress prop.
// The pre-set style is black background, white color and orange hover
//------------------------------------------------------------------//


import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

const CustomButton = ({ text, onPress, width = '90%', backgroundColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button, backgroundColor && { backgroundColor },
        { width}, 
        pressed && styles.buttonPressed && { backgroundColor: Colors.orangeColor },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: hp('0,5%'),
  },
  buttonPressed: {
    backgroundColor: Colors.orangeColor,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;
