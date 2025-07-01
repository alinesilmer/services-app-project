import { Text, View, StyleSheet, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors'
import { Metrics } from '../../constants/Metrics';

import SlideUpCard from '../../components/SlideUpCard';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';

export default function TermsClient() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard title="Términos y Condiciones de Uso" subtitle="Última actualización: 13/04/2025" style={styles.card}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <Text style={styles.text}>
                1. <Text style={styles.bold}>Aceptación</Text>{"\n"}
                Al suscribirse a un plan premium en la aplicación DILO.Pedilo.Hecho, el usuario acepta los siguientes términos y condiciones adicionales. Si no está de acuerdo, no debe continuar con la suscripción.{"\n\n"}

                2. <Text style={styles.bold}>Descripción del servicio</Text>{"\n"}
                La suscripción premium para clientes brinda beneficios adicionales, incluyendo navegación sin anuncios de terceros y mejoras en la experiencia de uso.{"\n\n"}

                3. <Text style={styles.bold}>Prueba gratuita</Text>{"\n"}
                Se ofrece un período de prueba gratuito. Durante este período, el usuario podrá acceder a los beneficios sin costo. Finalizada la prueba, se aplicará el cobro automático del plan elegido, salvo cancelación previa.{"\n\n"}

                4. <Text style={styles.bold}>Pagos y renovación</Text>{"\n"}
                Los pagos se gestionan mediante los medios habilitados dentro de la App. La suscripción se renueva automáticamente al finalizar cada período, salvo que el usuario la cancele previamente.{"\n"}
                * Los pagos no son reembolsables, salvo que se indique lo contrario en condiciones promocionales.{"\n"}
                * La cancelación tendrá efecto al final del período ya abonado.{"\n\n"}

                5. <Text style={styles.bold}>Beneficios</Text>{"\n"}
                Los beneficios del plan premium están sujetos a cambios o mejoras. La App notificará al usuario si se agregan o eliminan funciones relevantes.{"\n\n"}

                6. <Text style={styles.bold}>Modificaciones</Text>{"\n"}
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán notificados dentro de la App, y el uso continuo del servicio implicará la aceptación de los mismos.{"\n\n"}
              </Text>
            </ScrollView>
          </SlideUpCard>
        </View>
      </SafeAreaView>
    </>
  )
}

  const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    height: Metrics.safeArea
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    position: 'absolute',
    bottom: 0,
    height: Metrics.screenM,
		alignItems: 'stretch',
  },
  scrollView: {
		flexGrow: 1,
		width: Metrics.animationXL,
		alignSelf: 'center',
		paddingBottom: Metrics.marginL, 
	},
  text: {
		fontSize: Metrics.fontXS,
		textAlign: 'justify',
		color: Colors.textColor,
		lineHeight: Metrics.fontM,
	},
  bold: {
    fontWeight: 'bold'
  },
});
