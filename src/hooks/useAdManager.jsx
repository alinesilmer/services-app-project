import { useEffect, useState, useRef } from 'react';

export const useAdManager = ({ isPremium = false } = {}) => {
  const [showAd, setShowAd] = useState(false);
  const adTimer = useRef(null);

    //trigger for calling an Ad
  const triggerAd = () => {
    if (!isPremium) {
      setShowAd(false);
    }
  };

  const closeAd = () => {
    setShowAd(false);
    resetAdTimer();
  };

  const resetAdTimer = () => {
    if (adTimer.current) clearTimeout(adTimer.current);

    
    adTimer.current = setTimeout(() => {
      triggerAd();
    }, 7 * 60 * 1000); 
  };

 
  useEffect(() => {
    if (!isPremium) {
      triggerAd(); 
      resetAdTimer(); 
    }
    return () => {
      if (adTimer.current) clearTimeout(adTimer.current);
    };
  }, []);

  return { showAd, triggerAd, closeAd };
};
