
"use client";
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';
import { usePremium } from '../../hooks/usePremium';
import { formatPrice } from '../../utils/pricingPlans';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
import { getUserProfile } from "../../utils/storage"

export default function ManagePremium() {
  const router = useRouter();
  const { premium, daysRemaining } = usePremium();
  const { type } = useLocalSearchParams()
  const [userType, setUserType] = useState(null);
  
  const normalize = (t) =>
    ["professional", "cliente"].includes(t) ? t : "cliente"
  useEffect(() => {
    getUserProfile().then((profile) =>
      setUserType(normalize(type || profile?.userType))
    )
  }, [type])

  const isProf = userType === "professional"

  const statusTextMap = {
    inactive: 'No tienes Premium activo',
    active: 'Tu Premium está activo',
    trial: 'Prueba gratuita activa',
    paused: 'Tu Premium está pausado',
    cancelled: 'Tu Premium ha sido cancelado',
    expired: 'Tu Premium ha expirado',
  };

  const subtitleMap = {
    inactive: 'Obtén Premium para disfrutar beneficios.',
    active: `Plan activo: ${premium.planDetails?.label || premium.premiumType}.`,
    trial: `Quedan ${daysRemaining} días de prueba.`,
    paused: 'Pausado: reanuda o cancela cuando quieras.',
    cancelled: 'Cancelado. Reactiva para volver a Premium.',
    expired: 'Expirado. Renueva para seguir.',
  };

  const statusText = statusTextMap[premium.premiumStatus] || statusTextMap.inactive;
  const subtitle = subtitleMap[premium.premiumStatus] || subtitleMap.inactive;
  const goRoute = '/auth/goPremium';

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard title={statusText} subtitle={subtitle} style={styles.card}>
            <ScrollView contentContainerStyle={styles.scroll}>
              {premium.planDetails && (
                <View style={styles.planBox}>
                  <Text style={styles.infoTitle}>Detalles del plan:</Text>
                  <Text style={styles.infoItem}>
                    Plan: {premium.planDetails.label || premium.premiumType}
                  </Text>
                  <Text style={styles.infoItem}>
                    Precio: {formatPrice(premium.planDetails.price)}
                  </Text>
                  {premium.premiumEndDate && (
                    <Text style={styles.infoItem}>
                      {premium.premiumStatus === 'trial' ? 'Termina:' : 'Renovación:'}{' '}
                      {new Date(premium.premiumEndDate).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.actions}>
                {premium.premiumStatus === 'inactive' && (
                  <CustomButton
                    text="Obtener Premium"
                    width={Metrics.animationXL}
                    onPress={() => router.push(goRoute)}
                  />
                )}
                {premium.premiumStatus === 'active' && (
                  <>
                    <CustomButton
                      text="Pausar Premium"
                      width={Metrics.animationXL}
                      onPress={() => router.push('/tabs/pausePremium')}
                    />
                    <CustomButton
                      text="Cancelar Premium"
                      width={Metrics.animationXL}
                      onPress={() => router.push('/tabs/stopPremium')}
                    />
                  </>
                )}
                {premium.premiumStatus === 'trial' && (
                  <>
                    <CustomButton
                    text="Actualizar a pago"
                    onPress={() => router.push(goRoute)}  
                    width={Metrics.animationXL}
                    style={{ backgroundColor: Colors.orangeColor }}
                  />
                    <CustomButton
                      text="Cancelar prueba"
                      width={Metrics.animationXL}
                      onPress={() => router.push('/tabs/stopPremium')}
                    />
                  </>
                )}
                {premium.premiumStatus === 'paused' && (
                  <>
                    <CustomButton
                      text="Reanudar Premium"
                      width={Metrics.animationXL}
                      onPress={() => router.push('/tabs/resumePremium')}
                    />
                    <CustomButton
                      text="Cancelar definitivamente"
                      width={Metrics.animationXL}
                      onPress={() => router.push('/tabs/stopPremium')}
                    />
                  </>
                )}
                {['cancelled', 'expired'].includes(premium.premiumStatus) && (
                  <>
                    <CustomButton
                      text="Reactivar Premium"
                      width={Metrics.animationXL}
                      onPress={() => router.push(goRoute)}
                    />
                    <CustomButton
                      text="Volver al Inicio"
                      width={Metrics.animationXL}
                      onPress={() => router.push(isProf ? '/tabs/professional/home' : '/tabs/client/home')}
                    />
                  </>
                )}
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    height: Metrics.screenM,
    alignItems: 'center',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: Metrics.marginS,
  },
  planBox: {
    backgroundColor: Colors.lightGray,
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    alignSelf: 'center',
    marginBottom: Metrics.marginS,
  },
  infoTitle: {
    fontSize: Metrics.fontM,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
    color: Colors.textColor,
  },
  infoItem: {
    fontSize: Metrics.fontS,
    marginBottom: Metrics.marginXS,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Metrics.marginS,
  },
});
