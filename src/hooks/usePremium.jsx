import { useState } from 'react';

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  const upgradeToPremium = (planId) => {
    // TODO: Handle API call 
    setIsPremium(true);
  };

  return { isPremium, upgradeToPremium };
}
