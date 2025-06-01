import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

export default function DisplayField({ label, value, editable = false, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.valueContainer}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor="#ccc"
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: wp('4%'),
  },
  label: {
    fontSize: wp('3%'),
    color: Colors.textColor,
    marginBottom: wp('1%'),
  },
  valueContainer: {
    backgroundColor: Colors.inputGray,
    width: '80%',
    height: 40,            
    borderRadius: 15,      
    justifyContent: 'center', 
    paddingHorizontal: 12, 
    fontSize: wp('3%'),
  },
  value: {
    fontSize: wp('4%'),
    color: Colors.textColor,
    fontWeight: '500',
  },
});
