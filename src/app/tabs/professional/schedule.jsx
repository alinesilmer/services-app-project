import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SlideUpCard from '../../../components/SlideUpCard';
import BackButton from '../../../components/BackButton';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../constants/Colors';
import BottomNavBar from '../../../components/NavBar';
import TimeSlotGrid from '../../../components/TimeSlotGrid';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        <StatusBar style="light" backgroundColor={Colors.primary} />
        <BackButton style={styles.backButton} />
        <View style={styles.container}>
          <SlideUpCard title="Agenda" subtitle="<<<  06/04/25  -  13/04/25  >>>" style={styles.card}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <TimeSlotGrid 
                onSelect={(cell) => console.log('Seleccionado:', cell)}
              />

              <CustomButton 
                text="Gestionar turnos pendientes" 
                onPress={() => console.log('Redirige a pagina de turnos')}
                style={styles.customBotton}
              />
            </ScrollView>
          </SlideUpCard>
        </View>
      <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp('1%')
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  card: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: 'white',
    paddingTop: hp('2%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginTop: hp('16%'),
    marginBottom: hp('1%')
  },
  scrollContent: {
    alignItems: 'flex-start',
    paddingBottom: hp('6%'),
    paddingHorizontal: wp('2%'), 
    width: '100%',
    flexGrow: 1,
  },
  customBotton: {
    marginTop: hp('20%'),
    width: '100%'
  },

});
