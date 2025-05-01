import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
    top: hp('10%'),
    left: wp('7%'),
    backgroundColor: 'rgba(169, 169, 169, 0.7)',
    padding: wp('3%'),
    borderRadius: wp('3%'),
    zIndex: 1,
  },
  buttonHover: {
    backgroundColor: 'rgb(208, 207, 207)',
  },
});