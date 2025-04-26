import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; 

export default function AnimationFeedback({ type }) {
  let source;

  if (type === 'loading') {
    source = require('../assets/animations/loading.json');
  } else if (type === 'success') {
    source = require('../assets/animations/success.json');
  } else if (type === 'failure') {
    source = require('../assets/animations/failure.json');
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={source}
        autoPlay
        loop={type === 'loading'}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
});
