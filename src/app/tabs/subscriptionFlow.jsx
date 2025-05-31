import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAdManager } from '../../hooks/useAdManager';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import SlideUpCard from '../../components/SlideUpCard';
import Logo from '../../components/Logo';
import PaymentList from '../../components/PaymentList';
import CustomButton from '../../components/CustomButton';
import ModalCard from '../../components/ModalCard';
import AnimationFeedback from '../../components/AnimationFeedback';

import { Colors } from '../../constants/Colors';
import { paymentMethods } from '../../utils/paymentMethods';
import { setPremiumStatus, isPremiumUser, validateCreditCard } from "../../../utils/storage"

export default function SubscriptionFlow() {
  const router = useRouter();
  const { planType } = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [alreadyPremium, setAlreadyPremium] = useState(false)

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const isPremium = await isPremiumUser()
      setAlreadyPremium(isPremium)
    }

    checkPremiumStatus()
  }, [])

  const handlePayment = async () => {
    if (!isFormValid) {
      setShowFailure(true);
    } else {
      setShowSuccess(true);
      const premiumSaved = await setPremiumStatus(true)

      if (premiumSaved) {
        setShowSuccess(true)
      } else {
        setPaymentError("Error al procesar el pago. Inténtelo de nuevo.")
        setShowFailure(true)
      }
    }
  };

  // TODO: Implementar la lógica para guardar el estado premium del usuario cuando este configurada la persistencia
  const adManager = useAdManager({ isPremium: true });

  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <Logo />
        <SlideUpCard
          title="Pago"
          subtitle={`Suscripción seleccionada: ${planType ?? 'N/A'}`}
          style={styles.card}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <PaymentList
              methods={paymentMethods}
              selected={selectedMethod}
              onSelect={setSelectedMethod}
              onValidityChange={setIsFormValid}
            />
            <CustomButton
              text="Pagar"
              onPress={handlePayment}
              disabled={!isFormValid}
              style={{ marginTop: hp('2%') }}
            />
          </ScrollView>
        </SlideUpCard>
      </View>
      <SafeAreaView style={styles.safeArea} />

      <ModalCard
        visible={showSuccess}
        title="¡Felicidades!"
        onClose={() => {
          setShowSuccess(false);
          router.push('tabs/professional/home');
        }}
      >
        <AnimationFeedback type="success" />
        <Text style={styles.messageText}>Bienvenido a Dilo Premium.</Text>
      </ModalCard>

      <ModalCard
        visible={showFailure}
        title="Error en el pago"
        onClose={() => setShowFailure(false)}
      >
        <AnimationFeedback type="failure" />
        <Text style={styles.messageText}>
          Por favor revisa la información e inténtalo de nuevo.
        </Text>
      </ModalCard>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center'
  },
  card: {
    width: wp('100%'),
    marginTop: hp('30%'),
    paddingVertical: wp('10%'),
    height: hp('70%')
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  safeArea: {
    backgroundColor: Colors.whiteColor
  },
  messageText: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    textAlign: 'center'
  }
});
