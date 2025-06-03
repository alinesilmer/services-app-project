import { useLocalSearchParams } from 'expo-router';
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../../constants/Colors';
import BackButton from '../../../components/BackButton';
import ProfilePic from '../../../components/ProfilePic';
import CustomButton from '../../../components/CustomButton';
import SlideUpCard from '../../../components/SlideUpCard';
import NavBar from '../../../components/NavBar';
import Rate from '../../../components/Rate';
import ServiceItem from '../../../components/ServiceItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';


export default function HomeScreen() {
    const {username, email, birthdate, userType, publicitado } = useLocalSearchParams();
    const birth = birthdate ? new Date(birthdate) : null;
    const params = useLocalSearchParams();
    const [isPublicitado, setIsPublicitado] = useState(publicitado === 'true');

    const Boton = ({ texto, onPress }) => (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado
        ]}>
            <Text style={styles.texto}>{texto}</Text>
        </Pressable>
    );

    const Card = ({text}) => (
        <View style={styles.cardToService}>
            <View style={styles.alertStyle}>
                <Feather name='alert-circle' size={35} color={Colors.orangeColor}/>
                <Text style={styles.alertText}>¡SE NECESITA!</Text>
            </View>
            <Text style={styles.cardText}>{text}</Text>
            <Boton texto='Ver detalles de la solicitud' onPress={() => alert('¡Presionado!')} />
        </View>
    );

    const Icono = ({nom='spa', size=50}) => (
        <View style={styles.icoContainer}>
            <FontAwesome5 name={nom} size={size} color="#bbb" />
        </View>
    );

    return (<View style={styles.container}>
        <StatusBar barStyle='auto'/>
        <BackButton />
        <View style={styles.profileContainer}>
            <ProfilePic uri={'https://randomuser.me/api/portraits/men/73.jpg'} size='100'/>
            <View style={styles.titleRateContainer}>
                <Text style={styles.title}>HOLA, MARTÍN GONZALEZ</Text>
                <Rate rating={3} reviews={95}/>
            </View>
        </View>
        <View style={styles.iconsContainer}>
            <View style={styles.iconView}>
                <Icono />
                <Text style={{textAlign: 'center', color: '#bbb'}}>Belleza</Text>
            </View>
            <Feather name='chevron-right' size={30} color={'#bbb'}/>
            <View style={styles.iconView}>
                <Icono nom='cut'/>
                <Text style={{textAlign: 'center', color: '#bbb'}}>Peluquería</Text>
            </View>
        </View>
        
        {isPublicitado ? (
        <CustomButton text="Ya estás publicitado" disabled />
        ) : (
        <CustomButton
            text="Publicitate"
            onPress={() => router.push('/tabs/professional/autopublicitacion')}
        />
        )}

        <SlideUpCard style={styles.slideUpCard}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.buttonContainer}>                    
                    <Boton texto='Trabajos completados: 22' onPress={() => alert('¡Presionado!')} />
                    <Boton texto='Valoración de clientes: 95' onPress={() => alert('¡Presionado!')} />
                    <Boton texto='Solicitudes recibidas: 3' onPress={() => alert('¡Presionado!')} />
                </View>
                <View style={styles.ultimoAviso}>
                    <Text style={styles.texto}>Más recientes</Text>
                    <Card text='Servicio de maquillaje para evento'/>
                    <Card text='Cortador de pasto' />
                    <Card text='Maestro Mayor de Obras' />
                </View>
            </ScrollView>
        </SlideUpCard>
        <NavBar />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blueColor,
        flex: 1,
        alignItems: 'center'
    },
    profileContainer: {
        flexDirection: 'row',
        width: wp('80%'),
        height: hp('11%'),
        padding: 4,
        justifyContent: 'space-between',
        marginTop: 160
    },
    photo: {
        borderWidth: '10%'
    },
    titleRateContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '73%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10%'
    },
    title: {
        color: 'white',
        fontSize: wp('5%'),
        fontWeight: 'bold'
    },
    rateContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'orange'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp('65%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
    },
    slideUpCard: {
        flex: 1,
        borderTopRightRadius: wp('30%'),
        borderTopLeftRadius: 0,
        marginTop: hp('1%'),
        justifyContent: 'flex-start',
        paddingBottom: 0
    },
    buttonContainer: {
        width: '100%',
        padding: '2%',
        gap: '6%',
    },
    scroll: {
        marginTop: '10%',
        width: '90%',
        marginBottom: 0
    },
    buttonInCard: {
        width: '80%',
        color: 'green'
    },
    boton: {
        backgroundColor: '#aaa',
        paddingVertical: '4%',
        borderRadius: 17,
        alignItems: 'center',
        width: '90%',
        zIndex: 1
    },
    botonPresionado: {
        backgroundColor: Colors.orangeColor
    },
    texto: {
        color: '#000',
        fontSize: 24,
    },
    ultimoAviso: {
        padding: '2%',
        width: '100%',
    },
    cardToService: {
        margin: '1%',
        padding: '1%',
        borderRadius: '8%',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 20,
        borderStyle: 'solid',
        alignItems: 'center'
    },
    alertStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-evenly',
        marginVertical: '1%'
    },
    alertText: {
        color: Colors.orangeColor,
        fontSize: 32,
        fontWeight: 'bold'
    },
    cardText: {
        marginVertical: '2%',
        fontSize: 25,
        fontWeight: 'bold'
    },
    icoContainer: {
        padding: '6%',
        borderRadius: '20%',
        borderWidth: 3,
        borderColor: '#bbb',
        borderStyle: 'solid',
        alignItems: 'center',
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#88888855'
    },
});