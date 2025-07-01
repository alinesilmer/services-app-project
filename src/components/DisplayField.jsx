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
        <Text style={styles.value}> {value}</Text>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.marginS,
    alignItems: "center"
  },
  label: {
    fontSize: Metrics.fontM,
    color: Colors.textColor,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
  },
  valueContainer: {
    backgroundColor: Colors.inputGray,
    width: Metrics.publicityHome,
    height: Metrics.marginXXL,            
    borderRadius: Metrics.radiusS,      
    justifyContent: "space-between", 
    paddingHorizontal: Metrics.marginS, 
    fontSize: Metrics.fontS,
  },
  value: {
    fontSize: Metrics.fontS,
    color: Colors.blueColor,
    fontWeight: '500',
  },
});
