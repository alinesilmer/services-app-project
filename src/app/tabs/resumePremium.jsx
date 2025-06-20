import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomButton from '../../components/CustomButton';
import { usePremium } from '../../hooks/usePremium';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';

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
            width="90%"
            style={{ marginTop: hp('3%') }}
          />
        </SlideUpCard>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex:1, backgroundColor: Colors.blueColor },
  safeArea:   { flex:1, backgroundColor: Colors.blueColor },
  card:       { position:'absolute', bottom:0, width:wp('100%'), height:hp('75%') },
  infoBox:    { backgroundColor: Colors.lightBlue, padding:wp('4%'),
                borderRadius:wp('2%'), width:wp('90%'), alignSelf:'center' },
  infoTitle:  { fontSize:hp('2%'), fontWeight:'bold', marginBottom:hp('1%') },
  infoText:   { fontSize:hp('1.8%') },
});
