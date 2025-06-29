import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { useAdManager } from "../hooks/useAdManager";

const AdContext = createContext({
  showAd: false,
  closeAd: () => {},
  canClose: false,
  timer: 0,
  isPremium: true,
});

export const AdProvider = ({ children }) => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const ad = useAdManager();

  const value = isAuthenticated
    ? ad
    : {
        showAd: false,
        closeAd: () => {},
        canClose: false,
        timer: 0,
        isPremium: true,
      };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

export const useAd = () => useContext(AdContext);
