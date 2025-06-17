import { useLocalSearchParams } from 'expo-router';
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Colors } from '../../../constants/Colors';
import BackButton from '../../../components/BackButton';
import ProfilePic from '../../../components/ProfilePic';
import CustomButton from '../../../components/CustomButton';
import SlideUpCard from '../../../components/SlideUpCard';
import NavBar from '../../../components/NavBar';
import Rate from '../../../components/Rate';
import { ClientRequest } from '../../../data/mockClientRequest';
import ServiceItem from '../../../components/ServiceItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../utils/storage';
import { FlatList } from 'react-native';
import { ClientRequestCard } from '../../../components/ClientRequestCard';


export default function HomeScreen() {
    const [userProfile, setUserProfile] = useState(null);

    const { publicitado } = useLocalSearchParams();
    const [isPublicitado, setIsPublicitado] = useState(publicitado === 'true');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                console.log('Perfil cargado: ', profile);
                if (profile) {
                    setUserProfile(profile);
                }
            } catch (error) {
                console.log('Error al cargar el perfil: ', error);
            }
        };
        fetchUserProfile();
    }, []);

    if (!userProfile) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", marginTop: 50, color: "#fff" }}>
            Cargando perfil...
            </Text>
        </View>
        );
    }

    const Boton = ({ texto, onPress }) => (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado
        ]}>
            <Text style={styles.texto}>{texto}</Text>
        </Pressable>
    );

    const Icono = ({nom='spa', size=50}) => (
        <View style={styles.icoContainer}>
            <FontAwesome5 name={nom} size={size} color="#bbb" />
        </View>
    );

    const ClientRequestFlatList = () => {
        const requests = ClientRequest.filter(req => {
            return req.category === userProfile.profesion;
        });

        return (<FlatList
            data={requests}
            renderItem={({item}) => (
                <ClientRequestCard
                    item={item}
                />
            )}
            showsVerticalScrollIndicator={false}
        />);
    }

    return (<View style={styles.container}>
        <StatusBar barStyle='auto'/>
        <BackButton />
        <View style={styles.profileContainer}>
            <ProfilePic uri={userProfile?.avatar} size='100'/>
            <View style={styles.titleRateContainer}>
                <Text style={styles.title}>
                    HOLA, {userProfile
                            ? userProfile.fullName.toUpperCase() || 'Profesional'
                            : 'cargando...'
                    }
                </Text>
                <Pressable onPress={() => router.push({
                    pathname: '/tabs/professional/rateScreen',
                    params: {
                        rating:3,
                        reviews: 95
                    }
                })}>
                    <Rate rating={3} reviews={95}/>
                </Pressable>
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
            <View style={styles.buttonContainer}>
                <Text style={styles.simpleText}>Trabajos completados: 22</Text>
                <Text style={styles.simpleText}>Valoración de clientes: 95</Text>
                <Text style={styles.simpleText}>Solicitudes recibidas: 3</Text>
            </View>
            <ClientRequestFlatList />
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
        marginTop: hp('2%'),
        justifyContent: 'flex-start',
        paddingBottom: 0
    },
    buttonContainer: {
        marginTop: hp('5%'),
        width: '80%',
        padding: '2%',
        gap: '8%',
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
        margin: wp('1%'),
        padding: hp('1%'),
        borderRadius: wp('2.5%'),
        borderWidth: wp('0.1%'),
        borderColor: '#888',
        borderStyle: 'solid',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: '#dedede'
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
    simpleText: {
        fontSize: wp('6%'),
    }
});