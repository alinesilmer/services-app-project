import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Index() {
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
          <CustomButton text="Iniciar Sesión" onPress={() => router.push('auth/login')} />
          <CustomButton text="Registrarme" onPress={() => router.push('auth/register')} />
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
    bottom: 0,
    height: hp('50%'),
    paddingBottom: hp('4%'),
    width: wp('100%'),
  },
});
