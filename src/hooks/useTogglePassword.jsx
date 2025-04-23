import { useState } from 'react';

export const useTogglePassword = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(prev => !prev);

  return {
    secureTextEntry: !visible,
    toggleVisibility,
    icon: visible ? 'eye-off' : 'eye',
  };
};
