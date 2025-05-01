import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ProfilePic from './ProfilePic'; 

const LongCard = ({ profilePicUri, title, subtitle, children }) => {
  return (
    <View style={styles.card}>
      {profilePicUri && (
        <ProfilePic uri={profilePicUri} size={70} />
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
    backgroundColor: 'white',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  text: {
    marginLeft: wp('4%'),
    flex: 1,
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('3.8%'),
    color: 'gray',
  },
});

export default LongCard;