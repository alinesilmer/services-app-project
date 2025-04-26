import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  return (
     <TouchableOpacity
      style={[styles.button, isPressed && styles.buttonHover]} 
      onPress={() => navigation.goBack()}
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)} 
    >
      <Feather name="chevron-left" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 90, 
    left: 30, 
    backgroundColor: "rgba(169, 169, 169, 0.7)", 
    padding: 10,
    borderRadius: 10,
    zIndex: 1, 
  },
  buttonHover: {
    backgroundColor: "rgb(208, 207, 207)", 
  }
});
