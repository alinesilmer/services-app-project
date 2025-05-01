import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PaymentForm = ({ onSubmit }) => {
  const [card, setCard] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [name, setName] = React.useState('');

  const isValid = card && cvv && expiry && name;

  return (
    <View style={styles.container}>
      <TextInput placeholder="Card Number" value={card} onChangeText={setCard} style={styles.input} />
      <TextInput placeholder="CVV/CVC No." value={cvv} onChangeText={setCvv} style={styles.input} />
      <TextInput placeholder="Valid Thru" value={expiry} onChangeText={setExpiry} style={styles.input} />
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <Button title="Send OTP" disabled={!isValid} onPress={() => onSubmit({ card, cvv, expiry, name })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginTop: 10
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 4
  }
});

export default PaymentForm;