// File: components/PricingComparisonTable.js
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Metrics } from '../constants/Metrics'
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
    borderRadius: Metrics.radiusS,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Metrics.marginXS,
    paddingHorizontal: Metrics.marginXS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: Metrics.radiusS,
    overflow: 'hidden',
    marginBottom: Metrics.marginS,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.marginS,
  },
  headerText: {
    fontWeight: '700',
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
    textAlign: 'center',
  },
  featureHeaderCell: {
    flex: 2.5,
  },
  valueHeaderCell: {
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: Metrics.marginS,
    borderBottomWidth: 1,
    borderColor: Colors.inputGray,
  },
  featureCell: {
    flex: 3, 
    justifyContent: 'center',
  },
  featureBodyCell: {
    paddingHorizontal: Metrics.marginS,
  },
  featureText: {
    fontSize: Metrics.fontS,
    color: Colors.dark,
    textAlign: 'left',
  },
  valueCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.marginXS,
    paddingHorizontal: Metrics.marginXS,
  },
  valueCellSelected: {
    backgroundColor: Colors.orangeTint,
    borderRadius: 6,
  },
  valueText: {
    fontSize: Metrics.fontXS,
    color: Colors.dark,
    textAlign: 'center',
  },
  valueTextSelected: {
    color: Colors.orangeColor,
    fontWeight: '700',
  },
})
