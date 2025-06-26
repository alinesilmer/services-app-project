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

export default function ResumePremium() {
  const router = useRouter();
  const { resumePremiumPlan, premium } = usePremium();
  const [isLoading, setIsLoading] = useState(false);

  const handleResume = () => {
    Alert.alert(
      "Reanudar Premium",
      "¿Estás listo para reanudar tu Premium?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Reanudar",
          onPress: async () => {
            setIsLoading(true);
            const result = await resumePremiumPlan();
            setIsLoading(false);
            if (result.success) {
              Alert.alert("¡Bienvenido de vuelta!", "Tu Premium ha sido reanudado.", [
                { text: "OK", onPress: () => router.push("tabs/managePremium") }
              ]);
            } else {
              Alert.alert("Error", "No se pudo reanudar el Premium.");
            }
          }
        }
      ]
    );
  };

  const getPausedDaysLeft = () => {
    if (!premium.pausedUntil) return 0;
    const diff = new Date(premium.pausedUntil) - new Date();
    return Math.ceil(diff / (1000*60*60*24));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safeArea}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title="Reanudar Premium"
          subtitle="¡Te extrañamos! Reanuda tu Premium y vuelve a disfrutar de los beneficios."
          style={styles.card}
        >
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Días restantes de pausa:</Text>
            <Text style={styles.infoText}>{getPausedDaysLeft()}</Text>
          </View>
          <CustomButton
            text={isLoading ? "Reanudando..." : "Reanudar ahora"}
            onPress={handleResume}
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
    flex:1, 
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: { 
    flex:1, 
    backgroundColor: Colors.blueColor 
  },
  card: { 
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  infoBox: { 
    backgroundColor: Colors.lightBlue, 
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    width: wp('90%'),
    alignSelf:'center' 
  },
  infoTitle: { 
    fontSize: Metrics.fontM,
    fontWeight:'bold', 
    marginBottom: Metrics.marginS,
  },
  infoText: { 
    fontSize: Metrics.fontS
  },
});
