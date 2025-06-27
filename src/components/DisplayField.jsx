import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

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
    marginBottom: Metrics.marginS,
  },
  label: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
    marginBottom: Metrics.marginS,
  },
  valueContainer: {
    backgroundColor: Colors.inputGray,
    width: wp("80%"),
    height: Metrics.screenS,            
    borderRadius: Metrics.radiusS,      
    justifyContent: 'center', 
    paddingHorizontal: Metrics.marginS, 
    fontSize: Metrics.fontM,
  },
  value: {
    fontSize: Metrics.fontM,
    color: Colors.textColor,
    fontWeight: '500',
  },
});
