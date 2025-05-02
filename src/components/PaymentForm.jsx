// This components collects data from user to pay 
// formats inputs and validate data; notifies changes and validations to parent.
//------------------------------------------------------------------//

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import CustomInput from './CustomInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PaymentForm = ({ onValidityChange }) => {
  const [card, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const isValid =
      card.replace(/\s+/g, '').length === 16 &&
      cvv.length >= 3 &&
      expiry.length >= 4 &&
      name.trim().length > 2;
    onValidityChange(isValid);
  }, [card, cvv, expiry, name]);

  const handleCardChange = text => {
    const cleaned = text.replace(/\D/g, '');
    const parts = cleaned.match(/.{1,4}/g);
    setCard(parts ? parts.join(' ') : cleaned);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
      <CustomInput
        label="Número de Tarjeta"
        placeholder="xxxx xxxx xxxx xxxx"
        value={card}
        onChangeText={handleCardChange}
        style={styles.input}
      />
      <CustomInput
        label="CVV"
        placeholder="123"
        value={cvv}
        onChangeText={setCvv}
        style={styles.input}
      />
      <CustomInput
        label="Vencimiento"
        placeholder="MM/YY"
        value={expiry}
        onChangeText={setExpiry}
        style={styles.input}
      />
      <CustomInput
        label="Nombre Completo"
        placeholder="Nombre y Apellido"
        value={name}
        onChangeText={setName}
        style={styles.input}
        />
        </KeyboardAvoidingView>
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginTop: wp('2%')
  },
  input: {
    width: '100%'
  }
});
