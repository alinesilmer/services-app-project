import { useState } from 'react';

export const usePaymentSelection = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const toggleSelection = (methodId) => {
    setSelectedMethod(prev => (prev === methodId ? null : methodId));
  };

  return {
    selectedMethod,
    toggleSelection
  };
};