// AnimationFeedback is a reusable component that shows a Lottie animation based on the 'type' prop.
// It can display a loading, success, or failure animation.
// Used for providing user feedback with stimulating visuals.
//------------------------------------------------------------------// 

import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; 
import { Metrics } from '../constants/Metrics';

const AnimationFeedback = ({ type }) => {
  let source;

  if (type === 'loading') {
    source = require('../assets/animations/loading.json');
  } else if(type === 'loadingComment') {
    source = require('../assets/animations/loadingComment.json');
  } else if (type === 'success') {
    source = require('../assets/animations/success.json');
  } else if (type === 'failure') {
    source = require('../assets/animations/failure.json');
  } else if (type === 'delete'){
    source = require('../assets/animations/deleted.json')
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

export default AnimationFeedback;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.marginS,
  },
  animation: {
    width: Metrics.animationL,
    height: Metrics.animationL,
  },
});
