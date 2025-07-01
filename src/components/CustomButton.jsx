// CustomButtom builds a button that receives text and onPress prop.
// The pre-set style is black background, white color and orange hover
//------------------------------------------------------------------//


import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Metrics } from '../constants/Metrics';
import { Colors } from '../constants/Colors';

const CustomButton = ({ text, onPress, width = '95%', backgroundColor, disabled = false }) => {
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
    backgroundColor: Colors.textColor,
    padding: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    alignItems: 'center',
    marginVertical: Metrics.safeArea,
  },
  buttonPressed: {
    backgroundColor: Colors.orangeColor,
  },
  text: {
    fontSize: Metrics.fontS,
    color: Colors.whiteColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.disabledColor,
    opacity: 1,
  },
  textDisabled: {
    color: '#eee',
  }
});

export default CustomButton;
