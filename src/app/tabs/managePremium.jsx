import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../../components/Logo';
import BackButton from '../../components/BackButton';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';
import { usePremium } from '../../hooks/usePremium';
import { formatPrice } from '../../utils/pricingPlans';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';

export default function ManagePremium() {
  const router = useRouter();
  const { premium, daysRemaining } = usePremium();

  const statusText = {
    active:    'Tu Premium está activo',
    trial:     'Prueba gratuita activa',
    paused:    'Tu Premium está pausado',
    cancelled: 'Tu Premium ha sido cancelado',
    expired:   'Tu Premium ha expirado'
  }[premium.premiumStatus] || 'No tienes Premium activo';

  const subtitle = {
    active:    `Tu plan ${premium.planDetails?.label || premium.premiumType} está activo.`,
    trial:     `Te quedan ${daysRemaining} días de prueba.`,
    paused:    'Pausado: reanuda o cancela cuando quieras.',
    cancelled: 'Cancelado. Puedes reactivarlo.',
    expired:   'Expirado. Renueva para seguir.'
  }[premium.premiumStatus] || 'Gestiona tu Premium desde aquí.';

  const goPremiumRoute = '/auth/goPremium';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safeArea}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard title={statusText} subtitle={subtitle} style={styles.card}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {premium.planDetails && (
              <View style={styles.planDetailsContainer}>
                <Text style={styles.planDetailsTitle}>Detalles del plan:</Text>
                <Text style={styles.planDetailsText}>Plan: {premium.planDetails.label || premium.premiumType}</Text>
                <Text style={styles.planDetailsText}>Precio: {formatPrice(premium.planDetails.price)}</Text>
                {premium.premiumEndDate && (
                  <Text style={styles.planDetailsText}>
                    {premium.premiumStatus === 'trial' ? 'Prueba termina: ' : 'Renovación: '}
                    {new Date(premium.premiumEndDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.actionsWrapper}>
            {(premium.premiumStatus === 'inactive') && (
              <CustomButton
                text="Obtener Premium"
                onPress={() => router.push(goPremiumRoute)}
                width={wp("100%")}
              />
            )}
            {(premium.premiumStatus === 'active') && (
              <>
                <CustomButton
                  text="Pausar Premium"
                  onPress={() => router.push('/tabs/pausePremium')}
                  width={wp("100%")}
                />
                <CustomButton
                  text="Cancelar Premium"
                  onPress={() => router.push('/tabs/stopPremium')}
                  width={wp("100%")}
                />
              </>
            )}
            {(premium.premiumStatus === 'trial') && (
              <>
                <CustomButton
                  text="Actualizar a pago"
                  onPress={() => router.push(goPremiumRoute)}
                  width={wp("100%")}
                  style={{ backgroundColor: Colors.orangeColor }}
                />
                <CustomButton
                  text="Cancelar prueba"
                  onPress={() => router.push('/tabs/stopPremium')}
                  width={wp("100%")}
                />
              </>
            )}
            {(premium.premiumStatus === 'paused') && (
              <>
                <CustomButton
                  text="Reanudar Premium"
                  onPress={() => router.push('/tabs/resumePremium')}
                  width={wp("100%")}
                />
                <CustomButton
                  text="Cancelar definitivamente"
                  onPress={() => router.push('/tabs/stopPremium')}
                  width={wp("100%")}
                />
              </>
            )}
            {['cancelled','expired'].includes(premium.premiumStatus) && (
              <CustomButton
                text="Reactivar Premium"
                onPress={() => router.push(goPremiumRoute)}
                width={wp("100%")}
              />
              )}
              </View>
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
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: Metrics.marginS,
  },
  planDetailsContainer: {
    backgroundColor: Colors.lightGray,
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
    width: wp("90%"),
  },
  planDetailsTitle: {
    fontSize: Metrics.fontM,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
  },
  planDetailsText: {
    fontSize: Metrics.fontS,
    marginBottom: Metrics.marginS,
  },
  actionsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Metrics.marginS,
  }
});
