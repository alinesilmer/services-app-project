import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfilePic from './ProfilePic'; 

const LongCard = ({ profilePicUri, title, subtitle, rate }) => {
  return (
    <View style={styles.card}>
      {profilePicUri && (
        <ProfilePic
          uri={profilePicUri}
          size={70} />
      )}
       <View style={styles.text}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {rate && (
        <View style={styles.rateContainer}>
          {rate}
        </View>
        )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    gap: 8,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  rateContainer: {
    marginVertical: 3,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4,
    marginLeft: 5
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default LongCard;
