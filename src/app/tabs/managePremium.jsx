import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../../components/Logo';
import BackButton from '../../components/BackButton';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';
import { usePremium } from '../../hooks/usePremium';
import { formatPrice } from '../../utils/pricingPlans';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';

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
                width="100%"
              />
            )}
            {(premium.premiumStatus === 'active') && (
              <>
                <CustomButton
                  text="Pausar Premium"
                  onPress={() => router.push('/tabs/pausePremium')}
                  width="100%"
                />
                <CustomButton
                  text="Cancelar Premium"
                  onPress={() => router.push('/tabs/stopPremium')}
                  width="100%"
                />
              </>
            )}
            {(premium.premiumStatus === 'trial') && (
              <>
                <CustomButton
                  text="Actualizar a pago"
                  onPress={() => router.push(goPremiumRoute)}
                  width="100%"
                  style={{ backgroundColor: Colors.orangeColor }}
                />
                <CustomButton
                  text="Cancelar prueba"
                  onPress={() => router.push('/tabs/stopPremium')}
                  width="100%"
                />
              </>
            )}
            {(premium.premiumStatus === 'paused') && (
              <>
                <CustomButton
                  text="Reanudar Premium"
                  onPress={() => router.push('/tabs/resumePremium')}
                  width="100%"
                />
                <CustomButton
                  text="Cancelar definitivamente"
                  onPress={() => router.push('/tabs/stopPremium')}
                  width="100%"
                />
              </>
            )}
            {['cancelled','expired'].includes(premium.premiumStatus) && (
              <CustomButton
                text="Reactivar Premium"
                onPress={() => router.push(goPremiumRoute)}
                width="100%"
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
    backgroundColor: Colors.blueColor
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor
  },
  card: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('70%')
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: hp('2%')
  },
  planDetailsContainer: {
    backgroundColor: Colors.lightGray,
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    width: wp('90%')
  },
  planDetailsTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: hp('1%')
  },
  planDetailsText: {
    fontSize: hp('1.8%'),
    marginBottom: hp('0.5%')
  },
  actionsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
