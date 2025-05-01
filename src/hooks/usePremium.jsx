import { useState } from 'react';

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  const upgradeToPremium = (planId) => {
    // TODO: Handle API call or purchase logic
    setIsPremium(true);
  };

  return { isPremium, upgradeToPremium };
}
