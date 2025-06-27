import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import ModalCard from '../../components/ModalCard';
import AnimationFeedback from '../../components/AnimationFeedback';
import PaymentList from '../../components/PaymentList';
import { paymentMethods } from '../../utils/paymentMethods';
import { usePremium } from '../../hooks/usePremium';
import { validateCreditCard } from '../../utils/storage';
import { getPlanDetails } from '../../utils/pricingPlans';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function SubscriptionFlow() {
  const router = useRouter();
  const { planType, userType } = useLocalSearchParams();
  const { subscribeToPremium } = usePremium();

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isValid, setIsValid]               = useState(false);
  const [paymentData, setPaymentData]       = useState({ number:'', name:'', cvv:'', expiry:'' });
  const [error, setError]                   = useState('');
  const [success, setSuccess]               = useState(false);
  const [failure, setFailure]               = useState(false);

  const mockCards = useMemo(() => [
    { type: 'visa',       number: '1111111111111111', cvv: '123',  expiry: '12/25', displayNumber: '**** **** **** 1111' },
    { type: 'mastercard', number: '5555555555554444', cvv: '456',  expiry: '11/26', displayNumber: '**** **** **** 4444' },
    { type: 'amex',       number: '378282246310005',  cvv: '1234', expiry: '10/27', displayNumber: '**** ****** 0005' },
  ], []);

  const handlePay = async () => {
    if (!isValid || !selectedMethod) {
      setError('Complete todos los campos y seleccione un método.');
      return setFailure(true);
    }
    const cardRes = validateCreditCard(paymentData);
    if (!cardRes.success) {
      setError(cardRes.message);
      return setFailure(true);
    }
    const details = getPlanDetails(planType);
    const sub = await subscribeToPremium(
      planType,
      {
        ...details,
        paymentMethod: selectedMethod,
        cardType: cardRes.cardType
      },
      userType
    );
    if (sub.success) {
      setSuccess(true);
    } else {
      setError('Error al procesar el pago.');
      setFailure(true);
    }
  };

  const dash = userType === 'professional'
    ? '/tabs/professional/dashboard'
    : '/tabs/client/dashboard';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <Logo />

      <SlideUpCard title="Pago" subtitle={`Plan: ${planType}`} style={styles.card}>
        <ScrollView
            horizontal={false}                     
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} 
            alwaysBounceHorizontal={false}         
            contentContainerStyle={styles.scrollContent}>
          <PaymentList
            methods={paymentMethods}
            selected={selectedMethod}
            onSelect={setSelectedMethod}
            onValidityChange={setIsValid}
            onPaymentDataChange={setPaymentData}
          />

          <View style={styles.testCardsContainer}>
            <Text style={styles.testCardsTitle}>Tarjetas de prueba</Text>
            {mockCards.map((c) => (
              <Text key={c.number} style={styles.testCardText}>
                {c.type.toUpperCase()}: {c.displayNumber} | CVV {c.cvv} | Exp: {c.expiry}
              </Text>
            ))}
          </View>

          <View style={styles.payBtnWrapper}>
          <CustomButton
            text="Pagar"
            onPress={handlePay}
            disabled={!isValid}
            style={{ marginTop: Metrics.marginS, marginBottom: Metrics.marginS }}
          />
          </View>
        </ScrollView>
      </SlideUpCard>

      <ModalCard
        visible={success}
        title="¡Felicidades!"
        onClose={() => {
          setSuccess(false);
          router.push(dash);
        }}
      >
        <AnimationFeedback type="success" />
        <Text style={styles.messageText}>Bienvenido a Dilo Premium.</Text>
      </ModalCard>

      <ModalCard
        visible={failure}
        title="Error"
        onClose={() => setFailure(false)}
      >
        <AnimationFeedback type="failure" />
        <Text style={styles.messageText}>{error}</Text>
      </ModalCard>
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
  card: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: Metrics.marginS,
    height: Metrics.screenM,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Metrics.marginS,
    paddingTop: Metrics.marginS,
  },
  messageText: {
    fontSize: Metrics.fontM,
    marginTop: Metrics.marginS,
    textAlign: 'center',
  },
  testCardsContainer: {
    backgroundColor: '#f5f5f5',
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginTop: Metrics.marginS,
    width: wp("90%"),
    alignSelf: 'center',
  },
  testCardsTitle: {
    fontWeight: 'bold',
    marginBottom: Metrics.marginXS,
    color: Colors.blueColor,
  },
  testCardText: {
    fontSize: Metrics.fontXS,
    color: Colors.orangeColor,
    marginBottom: Metrics.marginXS,
  },
  payBtnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
