"use client";

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import ModalCard from '../../components/ModalCard';
import AnimationFeedback from '../../components/AnimationFeedback';
import PaymentList from '../../components/PaymentList';

import { usePremium } from '../../hooks/usePremium';
import { validateCreditCard } from '../../utils/storage';
import { getPlanDetails } from '../../utils/pricingPlans';
import { paymentMethods } from '../../utils/paymentMethods';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SubscriptionFlow() {
  const router = useRouter();
  const { planType, userType } = useLocalSearchParams();
  const { subscribeToPremium } = usePremium();

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [paymentData, setPaymentData] = useState({
    number: '',
    name: '',
    cvv: '',
    expiry: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const dash =
    userType === 'professional'
      ? '/tabs/professional/dashboard'
      : '/tabs/client/dashboard';

  const handlePay = async () => {
    console.log('handlePay called'); 
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
    const res = await subscribeToPremium(
      planType,
      { ...details, paymentMethod: selectedMethod, cardType: cardRes.cardType },
      userType
    );
    if (res.success) {
      setSuccess(true);
    } else {
      setError('Error al procesar el pago.');
      setFailure(true);
    }
  };

  const mockCards = useMemo(
    () => [
      {
        type: 'visa',
        number: '1111111111111111',
        cvv: '123',
        expiry: '12/25',
        display: '**** **** **** 1111',
      },
      {
        type: 'mastercard',
        number: '5555555555554444',
        cvv: '456',
        expiry: '11/26',
        display: '**** **** **** 4444',
      },
      {
        type: 'amex',
        number: '378282246310005',
        cvv: '1234',
        expiry: '10/27',
        display: '**** ****** 0005',
      },
    ],
    []
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
      >
        <View style={styles.container}>
          <BackButton />
          <Logo />

          <SlideUpCard title="Pago" subtitle={`Plan: ${planType}`} style={styles.card}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              <PaymentList
                methods={paymentMethods}
                selected={selectedMethod}
                onSelect={setSelectedMethod}
                onValidityChange={setIsValid}
                onPaymentDataChange={setPaymentData}
              />

              <View style={styles.mockBox}>
                <Text style={styles.infoTitle}>Tarjetas de prueba</Text>
                {mockCards.map((c) => (
                  <Text key={c.number} style={styles.mockText}>
                    {c.type.toUpperCase()}: {c.display} | CVV {c.cvv} | Exp: {c.expiry}
                  </Text>
                ))}
              </View>

              <CustomButton
                text="Pagar"
                onPress={handlePay}
                style={{ marginTop: Metrics.marginXS, marginBottom: Metrics.marginXS }}
              />
            </ScrollView>
          </SlideUpCard>
        </View>
      </KeyboardAvoidingView>

        <ModalCard
          visible={success}
          title="¡Éxito!"
          onClose={() => {
            setSuccess(false);
            router.push(dash);
          }}
        >
          <AnimationFeedback type="success" />
          <Text style={styles.infoTitle}>¡Bienvenido a Premium!</Text>
        </ModalCard>

        <ModalCard visible={failure} title="Error" onClose={() => setFailure(false)}>
          <AnimationFeedback type="failure" />
          <Text style={styles.infoTitle}>{error}</Text>
        </ModalCard>
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
    height: Metrics.screenM,
    alignItems: 'stretch',
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: Metrics.marginS,
    justifyContent: "center",
  },
  mockBox: {
    backgroundColor: '#f5f5f5',
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    width: wp('90%'),
    alignSelf: 'center',
  },
  infoTitle: {
    fontSize: Metrics.fontM,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
    color: Colors.textColor,
  },
  mockText: {
    fontSize: Metrics.fontXS,
    color: Colors.orangeColor,
    marginBottom: Metrics.marginXS,
  },
});
