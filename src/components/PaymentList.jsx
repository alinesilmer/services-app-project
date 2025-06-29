// PaymentList: renders a list of payment methods; expands the selected item to show PaymentForm. Handles validation
//------------------------------------------------------------------//

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PaymentForm from './PaymentForm';
import { Metrics } from '../constants/Metrics';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const PaymentList = ({ methods, selected, onSelect, onValidityChange, onPaymentDataChange }) => {
  const [saveDetails, setSaveDetails] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>¿Con qué método deseas pagar?</Text>

      {methods.map(method => {
        const isOpen = method.id === selected;
        return (
          <View key={method.id} style={[styles.item, isOpen && styles.itemOpen]}>
            <Pressable
              style={styles.itemHeader}
              onPress={() => onSelect(isOpen ? null : method.id)}
            >
              <View style={styles.labelRow}>
                {method.icon}
                <Text style={styles.methodText}>{method.title}</Text>
              </View>
              <Feather
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={Metrics.iconSmall}
                color={Colors.dark}
              />
            </Pressable>

            {isOpen && (
              <View style={styles.formWrapper}>
                <PaymentForm 
                  onValidityChange={onValidityChange} 
                  onPaymentDataChange={onPaymentDataChange}
                />

                <View style={styles.saveRow}>
                  <Switch
                    value={saveDetails}
                    onValueChange={setSaveDetails}
                    thumbColor={
                      saveDetails ? Colors.orangeColor : '#fff'
                    }
                    trackColor={{
                      false: Colors.inputGray,
                      true: Colors.orangeColor
                    }}
                  />
                  <Text style={styles.saveText}>Guardar Información</Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PaymentList;

const styles = StyleSheet.create({
  container: { 
    width: wp("90%"), 
    justifyContent: 'center',
    paddingBottom: Metrics.marginS
  },
  header: {
    fontSize: Metrics.fontS,
    fontWeight: 'bold',
    marginBottom: Metrics.marginM,
    textAlign: 'center'
  },
  item: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
    overflow: 'hidden',
    width: wp("90%"),
  },
  itemOpen: {
    borderColor: Colors.orangeColor,
    borderWidth: Metrics.marginXS
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.marginM,
    paddingVertical: Metrics.marginS,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  methodText: {
    marginLeft: Metrics.marginS,
    fontSize: Metrics.fontS,
  },
  formWrapper: {
    paddingHorizontal: Metrics.marginS,
    paddingBottom: Metrics.marginS,
  },
  saveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.marginXS,
  },
  saveText: {
    marginLeft: Metrics.marginXS,
    fontSize: Metrics.fontXS,
  },
});
