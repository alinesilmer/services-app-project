import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text as RNText } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SlideUpCard from '../../components/SlideUpCard';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import CustomButton from '../../components/CustomButton';
import Checkbox from 'expo-checkbox';
import PaymentList from '../../components/PaymentList';
import { Colors } from '../../constants/Colors';

export default function GoPremium() {
  const [accepted, setAccepted] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <SafeAreaView>
        <BackButton />
        <Logo />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SlideUpCard title="Dilo Premium">
            <RNText style={styles.description}>
              Suscríbete por 2 US$/mes o aprovecha el pack anual por 18 US$/año (1.5 US$/mes). Cancelación en cualquier momento.
            </RNText>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={accepted}
                onValueChange={setAccepted}
                style={styles.checkbox}
              />
              <RNText style={styles.checkboxLabel}>
                Acepto términos y condiciones
              </RNText>
            </View>

            {accepted && (
              <View style={styles.paymentSection}>
                <PaymentList />
              </View>
            )}

            {!accepted && (
              <CustomButton
                title="Acepto y continúo"
                onPress={() => setAccepted(true)}
              />
            )}
          </SlideUpCard>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    padding: 20,
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    color: 'black',
    fontSize: 14,
  },
  paymentSection: {
    marginTop: 16,
  },
});