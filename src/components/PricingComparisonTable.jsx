import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

const PricingComparisonTable = ({ headers, rows, selected, onSelect }) => {
  const planKeys = headers.slice(1).map(h => h.toLowerCase());

  return (
    <View style={styles.table}>
      {/* Encabezados */}
      <View style={styles.headerRow}>
        {headers.map((header, i) => (
          <Text key={i} style={styles.headerCell}>{header}</Text>
        ))}
      </View>

      {/* Contenido */}
      {rows.map((row, i) => (
        <View key={i} style={styles.dataRow}>
          <Text style={styles.cell}>{row.label}</Text>
          {row.values.map((value, j) => {
            const plan = planKeys[j];
            const isSelected = selected === plan;

            return (
              <Pressable
                key={j}
                style={styles.cell}
                onPress={() => onSelect(plan)}
              >
                {typeof value === 'boolean' ? (
                  <Feather
                    name={value ? (isSelected ? 'check-circle' : 'check') : 'x'}
                    size={20}
                    color={value ? (isSelected ? Colors.orangeColor : Colors.dark) : Colors.inputGray}
                  />
                ) : (
                  <Text style={[styles.text, isSelected && styles.selectedText]}>
                    {value}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default PricingComparisonTable;

const styles = StyleSheet.create({
  table: {
    borderRadius: 8,
    backgroundColor: Colors.whiteColor,
    padding: wp('4%')
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.inputGray,
    paddingBottom: hp('1%'),
    marginBottom: hp('1%')
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: wp('3.8%'),
    color: Colors.orangeColor,
    textAlign: 'center' 
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: hp('0.8%'),
  },
  cell: {
    flex: 1,
    fontSize: wp('3.8%'),
    color: Colors.dark,
    textAlign: 'center' 
  },
  text: {
    fontSize: wp('3.5%'),
    color: Colors.dark,
    textAlign: 'center'
  },
  selectedText: {
    color: Colors.orangeColor,
    fontWeight: 'bold'
  }
});
