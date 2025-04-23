import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

const CustomButton = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonPressed: {
    backgroundColor: Colors.orangeColor
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;
