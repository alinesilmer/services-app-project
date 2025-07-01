import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Metrics } from '../../constants/Metrics';
import { Colors } from '../../constants/Colors';

// Components
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';

export default function welcome() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ height: Metrics.safeArea, backgroundColor: Colors.blueColor }} />
      <View style={styles.container}>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Metrics.marginXS,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: Metrics.marginXS,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    height: Metrics.screenXS,
    alignItems: "stretch",
  },
});
