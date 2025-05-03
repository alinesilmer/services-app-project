import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors'
import SlideUpCard from '../../components/SlideUpCard';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import CustomButton from '../../components/CustomButton';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function TermsProf() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BackButton />
      <Logo />
      <SlideUpCard title="Términos y Condiciones de Uso" subtitle="Última actualización: 13/04/2025" style={styles.card}>
        <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>
            1. <Text style={styles.bold}>Aceptación</Text>{"\n"}
            Por favor, lea atentamente estos Términos y Condiciones antes de utilizar nuestra aplicación móvil DILO.Pedilo.Hecho como Profesional. {"\n"}
            Al registrarse y acceder a cualquiera de nuestros planes (Estándar o Plus), usted acepta cumplir con los siguientes términos.{"\n\n"}

            2. <Text style={styles.bold}>Descripción del servicio</Text>{"\n"}
            Nuestra App permite a profesionales ofrecer sus servicios, conectarse con potenciales clientes, y gestionar su presencia de forma digital. {"\n"}
            Ofrecemos dos tipos de suscripción para profesionales:{"\n"}
            Plan Estándar: USD 2 mensuales{"\n"}
            Plan Plus: USD 5 mensuales{"\n"}
            Cada plan ofrece distintas funcionalidades, detalladas dentro de la App.{"\n\n"}

            3. <Text style={styles.bold}>Registro y Datos Personales</Text>{"\n"}
            El usuario es responsable de la veracidad de los datos ingresados. Nos comprometemos a proteger la información personal según nuestra [Política de Privacidad].{"\n\n"}

            4. <Text style={styles.bold}>Pagos y renovación</Text>{"\n"}
            Los pagos se realizan a través de los medios habilitados en la App. Al suscribirse, usted autoriza el cobro recurrente del monto correspondiente según el plan seleccionado.{"\n"}
            * Los cargos son no reembolsables, salvo que se indique lo contrario en promociones específicas.{"\n"}
            * Puede cancelar su suscripción en cualquier momento desde la sección de configuración de su cuenta. La cancelación tendrá efecto al finalizar el período ya abonado.{"\n\n"}

            5. <Text style={styles.bold}>Modificaciones</Text>{"\n"}
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán notificados a través de la App. El uso continuado del servicio implica la aceptación de las modificaciones.{"\n\n"}

        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#50B0DA' : undefined}
          />
          <Text style={{ marginLeft: 8 }}>Acepto los términos y condiciones.</Text>
        </View>
        
        <CustomButton text="SUSCRIBIRSE" onPress={() => {}} />
        </ScrollView>
      </SlideUpCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: Colors.blueColor,
  alignItems: 'center',
  justifyContent: 'center',
},
card: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '85%',
  },
scrollView: {
      paddingBottom: 100, 
  },
  text: {
      fontSize: 14,
      color: 'black',
      lineHeight: 22,
  },
  bold: {
      fontWeight: 'bold',
  },
});
