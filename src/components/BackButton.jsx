// BackButton is a custom back navigation button using an icon.
// It uses navigation.goBack() unless a custom onPress is provided.
// The button also gives visual feedback on press.
//------------------------------------------------------------------// 

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Metrics } from '../constants/Metrics';

export default function BackButton({ onPress }) {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isPressed && styles.buttonHover]}
      onPress={handlePress}
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
    top: Metrics.buttonHeight,
    left: Metrics.marginM,
    backgroundColor: 'rgba(169, 169, 169, 0.7)',
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    zIndex: 1,
  },
  buttonHover: {
    backgroundColor: 'rgb(208, 207, 207)',
  },
});