// components/CustomInput.js
// CustomInput: builds a labeled text input, handles validation errors, and toggles password visibility.
// Props:
// - label: optional label text.
// - placeholder: placeholder text for input.
// - value: current text value.
// - onChangeText: callback when text changes.
// - error: error message to display.
// - secureTextEntry: boolean for password masking.
// - isPassword: whether to show toggle icon.
// - onIconPress: callback when icon pressed.
// - icon: icon name for toggle.
// Recently, I added an "style" prop to modify the input's style, for sizes purposes, but I highly recommend not using it
//------------------------------------------------------------------//
 
import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  isPassword = false,
  onIconPress,
  icon,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style, error && styles.errorInput]}
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {isPassword && (
          <TouchableOpacity onPress={onIconPress} style={styles.icon}>
            <Feather name={icon} size={Metrics.fontM} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.marginS,
    width: wp("100%"),
  },
  label: {
    fontFamily: Fonts.roboto,
    fontWeight: '500',
    fontSize: Metrics.fontS,
    marginBottom: Metrics.marginXS,
    color: Colors.dark
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputGray,
    borderRadius: Metrics.radiusS,
    paddingRight: Metrics.radiusS,
    marginBottom: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: '#eee',
    marginBottom: Metrics.marginS,
  },
  input: {
    flex: 1,
    padding: Metrics.marginM,
  },
  icon: {
    paddingLeft: Metrics.iconSmall,
  },
  errorInput: {
    borderColor: Colors.errorColor,
  },
  errorText: {
    color: Colors.errorColor,
    marginTop: Metrics.marginXS,
  },
});

export default CustomInput;
