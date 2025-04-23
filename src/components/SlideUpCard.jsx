import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const SlideUpCard = ({ title, subtitle, children, style }) => {
  return (
    <Animated.View entering={SlideInDown.duration(700)} style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    padding: 20,
    borderTopRightRadius: 90,
    borderTopLeftRadius: 20,
    shadowColor: Colors.inputGray,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontFamily: Fonts.roboto,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 40
  },
  subtitle: {
    fontFamily: Fonts.montserrat,
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center'
  },
});

export default SlideUpCard;
