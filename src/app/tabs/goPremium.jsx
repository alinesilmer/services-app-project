import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';
import PricingPlanSelector from '../../components/PricingPlanSelector';
import PaymentList from '../../components/PaymentList';
import ModalCard from '../../components/ModalCard';
import AnimationFeedback from '../../components/AnimationFeedback';

import { pricingPlans } from '../../utils/pricingPlans';
import { paymentMethods } from '../../utils/paymentMethods';
import { Colors } from '../../constants/Colors';

export default function GoPremium() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState('monthly');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const handleSubscribe = () => setStep(1);

  const handlePayment = () => {
    if (!isFormValid) {
      setShowFailure(true);
    } else {
      setShowSuccess(true);
    }
  };

  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title={step === 0 ? 'Dilo Premium' : 'Pago'}
          subtitle={
            step === 0
              ? 'Suscríbete y disfruta sin anuncios ni interrupciones.'
              : 'Ingresa los datos de pago'
          }
          style={styles.card}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {step === 0 ? (
              <>
                <PricingPlanSelector
                  plans={pricingPlans}
                  selected={plan}
                  onSelect={setPlan}
                />
                <CustomButton
                  text="Suscribirse"
                  onPress={handleSubscribe}
                  style={styles.subscribeBtn}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </ScrollView>
        </SlideUpCard>
      </View>
      <SafeAreaView style={styles.safeArea} />

      {/* Modal de éxito */}
      <ModalCard
        visible={showSuccess}
        title="¡Felicidades!"
        onClose={() => {
          setShowSuccess(false);
          router.back();
        }}
      >
        <AnimationFeedback type="success" />
        <Text style={styles.messageText}>Bienvenido a Dilo Premium.</Text>
      </ModalCard>

      {/* Modal de error */}
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
  subscribeBtn: {
    marginTop: hp('3%'),
    color: 'white'
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
