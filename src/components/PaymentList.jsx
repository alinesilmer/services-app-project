// PaymentList: renders a list of payment methods; expands the selected item to show PaymentForm. Handles validation
//------------------------------------------------------------------//

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PaymentForm from './PaymentForm';
import { Colors } from '../constants/Colors';

const PaymentList = ({ methods, selected, onSelect, onValidityChange }) => {
  const [saveDetails, setSaveDetails] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp('5%') }}>
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
                size={20}
                color={Colors.dark}
              />
            </Pressable>

            {isOpen && (
              <View style={styles.formWrapper}>
                <PaymentForm onValidityChange={onValidityChange} />

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
  container: { width: '100%' },
  header: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center'
  },
  item: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    overflow: 'hidden',
    width: wp('90%')
  },
  itemOpen: {
    borderColor: Colors.orangeColor,
    borderWidth: 1
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%')
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  methodText: {
    marginLeft: wp('2%'),
    fontSize: wp('4%')
  },
  formWrapper: {
    paddingHorizontal: wp('1%'),
    paddingBottom: hp('2%')
  },
  saveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%')
  },
  saveText: {
    marginLeft: wp('2%'),
    fontSize: wp('3.5%')
  },
});
