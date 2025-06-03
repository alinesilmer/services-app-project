// CustomButtom builds a button that receives text and onPress prop.
// The pre-set style is black background, white color and orange hover
//------------------------------------------------------------------//


import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

const CustomButton = ({ text, onPress, disabled = false }) => {
  return (
    <Pressable
      onPress={disabled ? null : onPress}
      disabled={disabled}
      style={({ pressed }) => {
        if (disabled) return [styles.button, styles.buttonDisabled];
        if (pressed) return [styles.button, styles.buttonPressed];
        return styles.button;
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
    width: wp('90%'),
    backgroundColor: '#000',
    padding: hp('2%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
    marginVertical: hp('0,5%'),
  },
  buttonPressed: {
    backgroundColor: Colors.orangeColor,
  },
  text: {
    fontSize: wp('4%'),
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  textDisabled: {
    color: '#666',
  }
});

export default CustomButton;
