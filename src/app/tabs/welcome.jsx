import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';

// Components
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';

export default function welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Logo />
      <SlideUpCard
        title="Bienvenido a Dilo"
        subtitle="Donde calidad y rapidez se unen"
        style={styles.card}
      >
        <View style={styles.buttonContainer}>
          <CustomButton text="Iniciar Sesión" onPress={() => router.push('/auth/login')} />
          <CustomButton text="Registrarme" onPress={() => router.push('/auth/register')} />
        </View>
      </SlideUpCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('5%'),
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    gap: hp('1.5%'),
  },
  card: {
    position: 'absolute',
    bottom: -10,
    height: hp('50%'),
    paddingBottom: hp('2%'),
    width: wp('100%'),
  },
});
