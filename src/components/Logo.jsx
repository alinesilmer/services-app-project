// components/Logo.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <Image source={require('../assets/images/logo-service-app.png')} style={styles.logo} />
  );
};

const styles = StyleSheet.create({
    logo: {
    position: 'absolute',
    top: 50,
    width: 400,
    height: 400,
    marginBottom: 24,
    resizeMode: 'contain',
  },
});

export default Logo;
