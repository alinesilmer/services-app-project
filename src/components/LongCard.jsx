import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Metrics } from '../constants/Metrics';
import { Colors } from '../constants/Colors';
import ProfilePic from './ProfilePic'; 

const LongCard = ({ profilePicUri, title, subtitle, children }) => {
  return (
    <View style={styles.card}>
      {profilePicUri && (
        <ProfilePic uri={profilePicUri} size={Metrics.iconMedium} />
      )}
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginM,
    marginVertical: Metrics.marginS,
    alignItems: 'center',
  },
  text: {
    marginLeft: Metrics.marginS,
    flex: 1,
  },
  title: {
    fontSize: Metrics.fontM,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
  },
  subtitle: {
    fontSize: Metrics.fontS,
    color: 'gray',
  },
});

export default LongCard;