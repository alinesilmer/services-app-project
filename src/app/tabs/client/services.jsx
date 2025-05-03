import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from "react";

import SearchBar from '../../../components/SearchBar';
import { Colors } from '../../../constants/Colors';

const services = () => {
  return (
    <View style={styles.safeArea}>
      <SearchBar/>
      <Text style={styles.sectionTitle}>services</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('2.5%'),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: wp('2%'),
  },
  welcome: {
    fontSize: wp('4.5%'),
    color: Colors.whiteColor,
  },
  username: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2.5%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: Colors.orangeColor,
    marginTop: hp('5%'),
    marginBottom: hp('1.5%'),
    paddingHorizontal: wp('1%'),
  },
});


export default services;
