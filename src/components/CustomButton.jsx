// CustomButtom builds a button that receives text and onPress prop.
// The pre-set style is black background, white color and orange hover
//------------------------------------------------------------------//


import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

const CustomButton = ({ text, onPress, width = '90%', backgroundColor, disabled = false }) => {
  return (
    <Pressable
      onPress={disabled ? null : onPress}
      disabled={disabled}
      style={({ pressed }) => {
      let baseStyle = [styles.button];

baseStyle.push({ width }); // SIEMPRE aplica el width

if (disabled) {
  baseStyle.push(styles.buttonDisabled);
} else {
  if (backgroundColor) baseStyle.push({ backgroundColor });
  if (pressed) baseStyle.push(styles.buttonDisabled, { backgroundColor: Colors.orangeColor });
}

      return baseStyle;
    }}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {text}
      </Text>
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
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 1,
  },
  textDisabled: {
    color: '#eee',
  }
});

export default CustomButton;
