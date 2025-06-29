// This components collects data from user to pay 
// formats inputs and validate data; notifies changes and validations to parent.
//------------------------------------------------------------------//

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import CustomInput from './CustomInput';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const PaymentForm = ({ onValidityChange, onPaymentDataChange }) => {
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
    
    if (onPaymentDataChange) {
      onPaymentDataChange({
        number: card,
        cvv: cvv,
        expiry: expiry,
        name: name
      });
    }
  }, [card, cvv, expiry, name]);

  const handleCardChange = text => {
    const cleaned = text.replace(/\D/g, '');
    const parts = cleaned.match(/.{1,4}/g);
    setCard(parts ? parts.join(' ') : cleaned);
  };

  const handleExpiryChange = text => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiry(`${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  const handleCvvChange = text => {
    const cleaned = text.replace(/\D/g, '');
    setCvv(cleaned.substring(0, 4)); 
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
          keyboardType="numeric"
          maxLength={19}
        />
        <CustomInput
          label="CVV"
          placeholder="123"
          value={cvv}
          onChangeText={handleCvvChange}
          style={styles.input}
          keyboardType="numeric"
          maxLength={4}
        />
        <CustomInput
          label="Vencimiento"
          placeholder="MM/YY"
          value={expiry}
          onChangeText={handleExpiryChange}
          style={styles.input}
          keyboardType="numeric"
          maxLength={5}
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
    width: wp("100%"),
    backgroundColor: '#F5F5F5',
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    marginTop: Metrics.marginS,
  },
  input: {
    width: wp("100%"),
    fontSize: Metrics.fontXS,
  }
});
