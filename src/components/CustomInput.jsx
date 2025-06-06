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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

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
            <Feather name={icon} size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
    width: wp('85%'),
  },
  label: {
    fontFamily: Fonts.roboto,
    fontWeight: '500',
     fontSize: wp('4%'),
    marginBottom: hp('0.5%'),
    color: Colors.dark
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputGray,
    borderRadius: wp('2%'),
    paddingRight: wp('3%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#eee',
    paddingRight: 12,
    marginBottom: 10
  },
  input: {
    flex: 1,
    padding: 18,
  },
  icon: {
    paddingLeft: 8,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default CustomInput;
