import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomFlatList from './CustomFlatList';
import LongCard from './LongCard';
import PaymentForm from './PaymentForm';
import { usePaymentSelection } from '../hooks/usePaymentSelection';
import { paymentMethods } from '../utils/paymentMethods';
import { Feather } from '@expo/vector-icons';

const PaymentList = () => {
  const { selectedMethod, toggleSelection } = usePaymentSelection();

  const handlePaymentSubmit = (formData) => {
    console.log('Payment submitted:', formData);
  };

  return (
    <CustomFlatList
      data={paymentMethods}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => toggleSelection(item.id)}>
            <LongCard
              profilePicUri={null}
              title={item.title}
              subtitle={item.subtitle}
              rate={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  {item.icon}
                  <Feather name={selectedMethod === item.id ? 'chevron-up' : 'chevron-down'} size={18} />
                </View>
              }
            />
          </TouchableOpacity>

          {selectedMethod === item.id && (
            <PaymentForm onSubmit={handlePaymentSubmit} />
          )}
        </View>
      )}
    />
  );
};

export default PaymentList;