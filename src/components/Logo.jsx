// Logo: displays the app logo image positioned absolutely at top.
//------------------------------------------------------------------//

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Metrics } from '../constants/Metrics';

const Logo = () => {
  return (
    <Image source={require('../assets/images/logo-service-app.png')} style={styles.logo} />
  );
};

const styles = StyleSheet.create({
    logo: {
    position: 'absolute',
    top: Metrics.marginS,
    width: Metrics.screenS,
    height: Metrics.screenS,
    marginBottom: Metrics.marginM,
    resizeMode: 'contain',
  },
});

export default Logo;
