// File: components/PricingComparisonTable.js
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons'

const PricingComparisonTable = ({ headers, rows, selected, onSelect }) => {
  const planKeys = headers.slice(1).map(h => h.toLowerCase())

  return (
    <View style={styles.table}>
      {/* Header */}
      <View style={styles.headerRow}>
        {headers.map((header, i) => (
          <View
            key={i}
            style={[
              styles.headerCell,
              i === 0 ? styles.featureHeaderCell : styles.valueHeaderCell,
            ]}
          >
            <Text style={styles.headerText}>{header}</Text>
          </View>
        ))}
      </View>

      {/* Rows */}
      {rows.map((row, i) => (
        <View key={i} style={styles.dataRow}>
          {/* Feature column */}
          <View style={[styles.featureCell, styles.featureBodyCell]}>
            <Text style={styles.featureText}>{row.label}</Text>
          </View>

          {/* Value columns */}
          {row.values.map((value, j) => {
            const plan = planKeys[j]
            const isSelected = selected === plan

            return (
              <Pressable
                key={j}
                style={[
                  styles.valueCell,
                  isSelected && styles.valueCellSelected,
                ]}
                onPress={() => onSelect(plan)}
              >
                {typeof value === 'boolean' ? (
                  <Feather
                    name={
                      value
                        ? isSelected
                          ? 'check-circle'
                          : 'check'
                        : 'x'
                    }
                    size={20}
                    color={
                      value
                        ? isSelected
                          ? Colors.orangeColor
                          : Colors.dark
                        : Colors.inputGray
                    }
                  />
                ) : (
                  <Text
                    style={[
                      styles.valueText,
                      isSelected && styles.valueTextSelected,
                    ]}
                  >
                    {value}
                  </Text>
                )}
              </Pressable>
            )
          })}
        </View>
      ))}
    </View>
  )
}

export default PricingComparisonTable

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: hp('1.5%'),
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  headerText: {
    fontWeight: '700',
    fontSize: wp('4%'),
    color: Colors.orangeColor,
    textAlign: 'center',
  },
  // Make first column wider
  featureHeaderCell: {
    flex: 3,  // increased from 2 → 3
  },
  valueHeaderCell: {
    flex: 1,
  },

  dataRow: {
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderColor: Colors.inputGray,
  },
  featureCell: {
    flex: 3,  // match header flex
    justifyContent: 'center',
  },
  featureBodyCell: {
    paddingHorizontal: wp('3%'),
  },
  featureText: {
    fontSize: wp('3.8%'),
    color: Colors.dark,
    textAlign: 'left',
  },
  valueCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('1%'),
  },
  valueCellSelected: {
    backgroundColor: Colors.orangeTint,
    borderRadius: 6,
  },
  valueText: {
    fontSize: wp('3.5%'),
    color: Colors.dark,
    textAlign: 'center',
  },
  valueTextSelected: {
    color: Colors.orangeColor,
    fontWeight: '700',
  },
})
