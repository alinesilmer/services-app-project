import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';
import { usePremium } from '../../hooks/usePremium';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function PausePremium() {
  const router = useRouter();
  const { pausePremiumPlan } = usePremium();
  const [isLoading, setIsLoading] = useState(false);

  const handlePause = () => {
    Alert.alert(
      "Pausar Premium",
      "¿Quieres pausar tu Premium por 6 meses?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Pausar",
          onPress: async () => {
            setIsLoading(true);
            const result = await pausePremiumPlan(6);
            setIsLoading(false);
            if (result.success) {
              Alert.alert("Premium pausado", "Podrás reanudarlo cuando quieras.", [
                { text: "OK", onPress: () => router.push("tabs/managePremium") }
              ]);
            } else {
              Alert.alert("Error", "No se pudo pausar el Premium.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safeArea}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title="Pausar Premium"
          subtitle="Pausa tu Premium por hasta 6 meses."
          style={styles.card}
        >
          <View style={styles.benefitsBox}>
            <Text style={styles.benefitsTitle}>Beneficios de pausar:</Text>
            <Text style={styles.benefitItem}>• Conservas tus datos</Text>
            <Text style={styles.benefitItem}>• No se cobra durante la pausa</Text>
            <Text style={styles.benefitItem}>• Puedes reanudar cuando quieras</Text>
          </View>
          <CustomButton
            text={isLoading ? "Pausando..." : "Confirmar pausa"}
            onPress={handlePause}
            disabled={isLoading}
            width={wp("90%")}
            style={{ marginTop: Metrics.marginS }}
          />
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
  benefitsBox: { 
    backgroundColor: Colors.lightGray, 
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS, 
    width: wp('90%'),
    alignSelf:'center' 
  },
  benefitsTitle: { 
    fontSize: Metrics.fontM, 
    fontWeight: 'bold', 
    marginBottom: Metrics.marginS,
  },
  benefitItem: { 
    fontSize: Metrics.fontS, 
    marginBottom: Metrics.marginS,
  },
});
