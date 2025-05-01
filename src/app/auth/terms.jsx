import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';

//Constants
import { Colors } from '../../constants/Colors'

//Components
import SlideUpCard from '../../components/SlideUpCard';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';

export default function Terms() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <BackButton />
            <Logo />
            <SlideUpCard title="Términos y Condiciones" subtitle="Todos los derechos reservados" style={styles.card}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.text}>
                    1. <Text style={styles.bold}>Aceptación</Text>{"\n"}
                    Al crear una cuenta o utilizar esta aplicación, el usuario acepta estos Términos y Condiciones. Si no está de acuerdo con alguna parte, no debe utilizar el servicio.{"\n\n"}

                    2. <Text style={styles.bold}>Uso de la Plataforma</Text>{"\n"}
                    Esta app conecta profesionales independientes con personas que requieren servicios. No somos responsables de la calidad, cumplimiento ni resultados de los servicios contratados entre usuarios.{"\n\n"}

                    3. <Text style={styles.bold}>Registro y Datos Personales</Text>{"\n"}
                    El usuario es responsable de la veracidad de los datos ingresados. Nos comprometemos a proteger la información personal según nuestra [Política de Privacidad].{"\n\n"}

                    4. <Text style={styles.bold}>Pagos</Text>{"\n"}
                    Los precios son definidos por cada profesional. La app puede ofrecer métodos de pago integrados o actuar como intermediario, pero no retiene fondos ni garantiza reembolsos fuera de lo establecido por cada prestador.{"\n\n"}

                    5. <Text style={styles.bold}>Calificaciones y Opiniones</Text>{"\n"}
                    Los usuarios pueden calificar u opinar sobre los servicios recibidos. Nos reservamos el derecho de moderar comentarios ofensivos o que violen estos términos.{"\n\n"}

                    6. <Text style={styles.bold}>Cancelaciones y Reembolsos</Text>{"\n"}
                    Cada profesional define sus políticas de cancelación y reembolso. La app no interviene en disputas económicas salvo que se indique expresamente.{"\n\n"}

                    7. <Text style={styles.bold}>Conducta del Usuario</Text>{"\n"}
                    Está prohibido:{"\n"}
                    - Usar lenguaje ofensivo o discriminatorio{"\n"}
                    - Publicar contenido falso{"\n"}
                    - Contactar a otros usuarios con fines no relacionados con los servicios{"\n"}
                    La infracción puede implicar la suspensión o eliminación de la cuenta.
                    </Text>
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
