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
    width: wp("50%"),
    alignItems: "center"
  },
  label: {
    fontSize: Metrics.fontM,
    color: Colors.textColor,
    fontWeight: '700',
    marginBottom: Metrics.marginS,
  },
  valueContainer: {
    backgroundColor: Colors.inputGray,
    width: wp("90%"),
    height: Metrics.marginXXL,            
    borderRadius: Metrics.radiusS,      
    justifyContent: "space-between", 
    paddingHorizontal: Metrics.marginXS, 
    fontSize: Metrics.fontM,
  },
  value: {
    fontSize: Metrics.fontS,
    color: Colors.blueColor,
    fontWeight: '500',
  },
});
