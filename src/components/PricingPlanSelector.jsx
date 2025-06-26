// PricingPlanSelector: displays pricing plans as selectable options.
// Props:
// - plans: array of { id, label, price }
// - selected: id of selected plan
// - onSelect: callback(planId)
//------------------------------------------------------------------//

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const PricingPlanSelector = ({ plans, selected, onSelect }) => (
  <View style={styles.container}>
    {plans.map(plan => {
      const isSelected = plan.id === selected;
      return (
        <Pressable
          key={plan.id}
          style={[styles.plan, isSelected && styles.planSelected]}
          onPress={() => onSelect(plan.id)}
        >
          <View style={styles.labelRow}>
            <Feather
              name={isSelected ? 'check-circle' : 'circle'}
              size={Metrics.iconSmall}
              color={isSelected ? Colors.orangeColor : Colors.dark}
            />
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {plan.label}
            </Text>
          </View>
          <Text style={[styles.price, isSelected && styles.priceSelected]}>
            {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export default PricingPlanSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.marginS,
  },
  plan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.marginS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.inputGray,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
  },
  planSelected: {
    borderColor: Colors.orangeColor,
    backgroundColor: Colors.lightGray,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginLeft: Metrics.marginS,
    fontSize: Metrics.fontS,
    color: Colors.dark
  },
  labelSelected: {
    color: Colors.orangeColor,
    fontWeight: 'bold'
  },
  price: {
    fontSize: Metrics.fontS,
    color: Colors.dark
  },
  priceSelected: {
    color: Colors.orangeColor,
    fontWeight: 'bold'
  },
});