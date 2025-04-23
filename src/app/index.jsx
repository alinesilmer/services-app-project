import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Colors';

// Components
import Logo from '../components/Logo';
import SlideUpCard from '../components/SlideUpCard';
import CustomButton from '../components/CustomButton';

export default function Index() {
  const router = useRouter();

  //Routes
  const LoginRoute = () => {
    router.push('auth/login');
  };

  const RegisterRoute = () => {
    router.push('auth/register');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Logo />
      <SlideUpCard
        title="Bienvenido a Dilo"
        subtitle="Donde calidad y rapidez se unen"
        style={styles.card}
      >
        <View style={styles.buttonContainer}>
        <CustomButton text="Iniciar Sesión" onPress={LoginRoute} />
          <CustomButton text="Registrarme" onPress={RegisterRoute} />
        </View>
      </SlideUpCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 10
  },
  card: {
    position: 'absolute',
    bottom: 0,
    height: '50%', 
    paddingBottom: 30,
  },
});
