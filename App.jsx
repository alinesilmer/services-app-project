
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }, []);
  return null; 
}
