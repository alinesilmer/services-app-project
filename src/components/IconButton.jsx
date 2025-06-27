// IconButton: pressable icon button with feedback on press.
// Props:
// - name: icon name from Feather.
// - size: icon size.
// - color: icon color.
// - onPress: callback.
// - style: additional custom style.
//------------------------------------------------------------------//

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Metrics } from '../constants/Metrics';

const IconButton = ({ name, size = Metrics.iconSmall, color = '#000', onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Feather name={name} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: Metrics.marginS,
  },
  pressed: {
    opacity: 0.6,
  },
});
