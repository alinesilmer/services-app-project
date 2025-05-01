import React from 'react';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export const paymentMethods = [
  {
    id: 'card',
    icon: <Feather name="credit-card" size={24} color="black" />,
    title: 'Debit / Credit Card',
    subtitle: 'Pay with your card'
  },
  {
    id: 'bank',
    icon: <Feather name="home" size={24} color="black" />,
    title: 'Net Banking',
    subtitle: 'Use internet banking'
  },
  {
    id: 'paypal',
    icon: <FontAwesome name="paypal" size={24} color="black" />,
    title: 'Paypal',
    subtitle: 'Secure online payment'
  },
  {
    id: 'upi',
    icon: <Feather name="smartphone" size={24} color="black" />,
    title: 'UPI',
    subtitle: 'Use your UPI ID'
  }
];
