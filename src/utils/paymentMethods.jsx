import React from 'react';
import { Feather } from '@expo/vector-icons';

export const paymentMethods = [
  {
    id: 'card',
    icon: <Feather name="credit-card" size={24} color="black" />,
    title: 'Debit / Credit Card'
  },
  {
    id: 'bank',
    icon: <Feather name="home" size={24} color="black" />,
    title: 'HomeBanking'
  }
];
