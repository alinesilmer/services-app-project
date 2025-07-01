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

export default function StopPremium() {
  const router = useRouter();
  const { cancelPremiumPlan } = usePremium();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Premium',
      '¿Estás seguro de que quieres cancelar tu Premium? Perderás todos los beneficios inmediatamente.',
      [
        { text: 'No, mantener', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            const res = await cancelPremiumPlan();
            setIsLoading(false);
            if (res.success) {
              Alert.alert(
                'Premium cancelado',
                'Tu Premium ha sido cancelado. Puedes reactivarlo en cualquier momento.',
                [{ text: 'OK', onPress: () => router.push('/tabs/managePremium') }]
              );
            } else {
              Alert.alert('Error', 'No se pudo cancelar.');
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
          title="Cancelar Premium"
          subtitle="Antes de cancelar, considera pausar tu Premium para conservar beneficios."
          style={styles.card}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}>⚠️ Al cancelar perderás:</Text>
              <Text style={styles.warningItem}>• Acceso sin anuncios</Text>
              <Text style={styles.warningItem}>• Funciones premium</Text>
              <Text style={styles.warningItem}>• Configuraciones guardadas</Text>
            </View>

            <CustomButton
              text={isLoading ? 'Cancelando...' : 'Cancelar definitivamente'}
              onPress={handleCancel}
              disabled={isLoading}
              width={wp('90%')}
              style={{ backgroundColor: Colors.redColor, marginTop: Metrics.marginS }}
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
    backgroundColor: Colors.blueColor,
  },
  card: {
    flex: 1,
    marginTop: Metrics.screenXS,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Metrics.marginS,
    marginTop: Metrics.marginM,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    width: wp("90%"),
    alignItems: "center",
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  warningContainer: {
    backgroundColor: "#ffebee",
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginTop: Metrics.marginS,
    marginHorizontal: Metrics.marginS,
    borderLeftWidth: Metrics.marginXS,
    borderLeftColor: Colors.redColor,
  },
  warningTitle: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    marginBottom: Metrics.marginS,
    color: Colors.redColor,
  },
  warningItem: {
    fontSize: Metrics.fontM,
    marginBottom: Metrics.marginS,
    color: Colors.dark,
  },
  alternativeContainer: {
    backgroundColor: "#e8f5e8",
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginTop: Metrics.marginS, 
    marginHorizontal: Metrics.marginS,
    borderLeftWidth: Metrics.marginXS,
    borderLeftColor: Colors.greenColor,
  },
  alternativeTitle: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    marginBottom: Metrics.marginS,
    color: Colors.greenColor,
  },
  alternativeText: {
    fontSize: Metrics.fontS,
    color: Colors.dark,
  },
})
