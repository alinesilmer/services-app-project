import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import BackButton from '../../../components/BackButton';
import Logo from '../../../components/Logo';
import SlideUpCard from '../../../components/SlideUpCard';
import CustomButton from '../../../components/CustomButton';
import PricingComparisonTable from '../../../components/PricingComparisonTable';

import { useValidation } from '../../../hooks/useValidation';
import { professionalPlans } from '../../../utils/professionalPlans';
import { Colors } from '../../../constants/Colors';
import { setPremiumProfStatus, isPremiumProf, validateCreditCard } from "../../../utils/storage"

export default function GoPremiumProf() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ acceptTerms: false });
  const [errors, setErrors] = useState({});
  const [alreadyPremium, setAlreadyPremium] = useState(false)

  useEffect(() => {
      const checkPremiumStatus = async () => {
        const isPremium = await isPremiumProf()
        setAlreadyPremium(isPremium)
      }
  
      checkPremiumStatus()
    }, [])

  const TermRoute = () => {
    router.push('auth/termsProf');
  };

  const change = (name, value) =>
    setFormData((p) => ({ ...p, [name]: value }));

  const handleSubscribe = async (selectedPlan) => {
    const validationErrors = useValidation(formData);
    
      if (!formData.acceptTerms) {
        validationErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
      }
    
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (selectedPlan) {
      await setPremiumProfStatus(true);

      router.push({
        pathname: '/tabs/subscriptionFlow',
        params: { planType: selectedPlan.toUpperCase() },
      });
    }
  };

  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title="Publicitá tu servicio"
          subtitle="Proba Dilo con tu propia marca personal"
          style={styles.card}
        >
          <ScrollView contentContainerStyle={styles.scroll}>
            <PricingComparisonTable
              headers={professionalPlans.headers}
              rows={professionalPlans.rows}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
            />

          <View style={styles.radioGroup}>
            {['estandar', 'plus'].map(plan => {
              const isSelected = selectedPlan === plan;
              return (
                <Pressable key={plan} style={styles.labelRow} onPress={() => setSelectedPlan(plan)}>
                  <Feather
                    name={isSelected ? 'check-circle' : 'circle'}
                    size={20}
                    color={isSelected ? Colors.orangeColor : Colors.dark}
                  />
                  <Text style={[styles.label, isSelected && styles.labelSelected]}>
                    {plan === 'estandar' ? 'Estandar' : 'Plus'}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={formData.acceptTerms}
              onValueChange={(v) => change('acceptTerms', v)}
              tintColors={{ true: Colors.orangeColor }}
            />
            <Text style={styles.checkboxText}>Acepto los </Text>
            <Pressable onPress={TermRoute}>
              <Text style={styles.link}>Términos y Condiciones</Text>
            </Pressable>
          </View>

          {errors.acceptTerms && (
            <Text style={styles.errorText}>{errors.acceptTerms}</Text>
          )}

          <CustomButton
            text="Suscribirme"
            onPress={() => handleSubscribe(selectedPlan)}
            disabled={!selectedPlan || !formData.acceptTerms}
            style={styles.subscribeBtn}
          />

          </ScrollView>
        </SlideUpCard>
      </View>
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
    marginTop: hp('20%'),
    paddingVertical: wp('5%'),
    height: hp('80%')
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  radioGroup: {
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('2%')
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginLeft: wp('5%')
  },
  label: {
    marginLeft: wp('2%'),
    fontSize: wp('4%'),
    fontStyle: 'bold',
    color: Colors.dark
  },
  labelSelected: {
    color: Colors.orangeColor,
    fontWeight: 'bold'
  },
  link: {
    color: Colors.orangeColor,
    textAlign: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1.5%')
  },
  checkboxText: {
    color: Colors.textColor,
    marginLeft: 10
  },
  subscribeBtn: {
    marginTop: hp('2%')
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5%'),
    marginBottom: hp('1%')
  },
});
