import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    width: wp('40%'),
    height: wp('40%'),
  },
});
