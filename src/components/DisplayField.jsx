import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function DisplayField({ label, value }) {
  return (
    <View style={styles.container}>
      {label != null && <Text style={styles.label}>{label}</Text>}

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  label: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  valueContainer: {
    backgroundColor: Colors.inputGray,
    width: '80%',
    height: 30,            
    borderRadius: 15,      
    justifyContent: 'center', 
    paddingHorizontal: 12, 
  },
  value: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});
