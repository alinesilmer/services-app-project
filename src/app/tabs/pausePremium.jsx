'use client';

import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import { usePremium } from '../../hooks/usePremium';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function PausePremium() {
  const router = useRouter();
  const { pausePremiumPlan } = usePremium();
  const [isLoading, setIsLoading] = useState(false);

  const handlePause = () => {
    Alert.alert(
      'Pausar Premium',
      '¿Quieres pausar tu Premium por 6 meses sin perder datos? No se cobrará durante la pausa.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Pausar',
          onPress: async () => {
            setIsLoading(true);
            const res = await pausePremiumPlan(6);
            setIsLoading(false);
            if (res.success) {
              Alert.alert('Premium pausado', 'Podrás reanudar cuando quieras.', [
                { text: 'OK', onPress: () => router.push('/tabs/managePremium') },
              ]);
            } else {
              Alert.alert('Error', 'No se pudo pausar.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safe}>
        <BackButton />
        <Logo />
        <SlideUpCard
          title="Pausar Premium"
          subtitle="Pausa tu Premium por hasta 6 meses conservando tus datos."
          style={styles.card}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Beneficios de pausar:</Text>
              <Text style={styles.infoItem}>• No se cobra durante la pausa</Text>
              <Text style={styles.infoItem}>• Mantienes tu configuración</Text>
            </View>

            <CustomButton
              text={isLoading ? 'Pausando...' : 'Confirmar pausa'}
              onPress={handlePause}
              disabled={isLoading}
              width={wp('90%')}
              style={{ marginTop: Metrics.marginS }}
            />
          </ScrollView>
        </SlideUpCard>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: { 
    flex: 1, 
    backgroundColor: Colors.blueColor 
  },
  card: { 
    flex: 1,
    marginTop: 200,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  benefitsBox: { 
    backgroundColor: Colors.lightGray, 
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS, 
    width: wp('90%'),
    alignSelf:'center' 
  },
  benefitsTitle: { 
    fontSize: Metrics.fontM, 
    fontWeight: 'bold', 
    marginBottom: Metrics.marginS,
  },
  benefitItem: { 
    fontSize: Metrics.fontS, 
    marginBottom: Metrics.marginS,
  },
});
