import { useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../../constants/Colors';
import { Metrics } from '../../../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import BackButton from '../../../components/BackButton';
import ProfilePic from '../../../components/ProfilePic';
import CustomButton from '../../../components/CustomButton';
import SlideUpCard from '../../../components/SlideUpCard';
import NavBar from '../../../components/NavBar';
import Rate from '../../../components/Rate';
import { ClientRequest } from '../../../data/mockClientRequest';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../utils/storage';
import { FlatList } from 'react-native';
import { ClientRequestCard } from '../../../components/ClientRequestCard';


export default Home = () => {
    const [userProfile, setUserProfile] = useState(null);

    const { publicitado } = useLocalSearchParams();
    const [isPublicitado, setIsPublicitado] = useState(publicitado === 'true');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
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
            <Text style={{ textAlign: "center", marginTop: Metrics.marginM, color: "#fff" }}>
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

    const Icono = ({nom='spa', size=Metrics.iconMedium}) => (
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
            <ProfilePic uri={userProfile?.avatar} size={Metrics.iconXLarge}/>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        flexDirection: 'row',
        width: wp('80%'),
        height: Metrics.screenM,
        padding: Metrics.marginS,
        justifyContent: 'space-between',
        marginTop: Metrics.marginM,
    },
    photo: {
        borderWidth: Metrics.marginS
    },
    titleRateContainer: {
        flex: 1,
        flexDirection: 'column',
        width: wp('75%'),
        alignItems: 'center',
        justifyContent: 'center',
        gap: Metrics.marginS,
    },
    title: {
        color: Colors.whiteColor,
        fontSize: Metrics.fontL,
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
        marginTop: Metrics.marginS,
        marginBottom: Metrics.marginS,
    },
    slideUpCard: {
        position: "absolute",
        bottom: 0,
        height: Metrics.screenM,
        alignItems: "stretch",
    },
    buttonContainer: {
        marginTop: Metrics.marginS,
        width: wp('80%'),
        padding: Metrics.marginS,
        gap: Metrics.marginS,
    },
    scroll: {
        marginTop: Metrics.marginS,
        width: wp('90%'),
        marginBottom: Metrics.marginXS,
    },
    buttonInCard: {
        width: '80%',
        color: 'green'
    },
    boton: {
        backgroundColor: '#aaa',
        paddingVertical: Metrics.marginS,
        borderRadius: Metrics.radiusS,
        alignItems: 'center',
        width: wp('90%'),
        zIndex: 1
    },
    botonPresionado: {
        backgroundColor: Colors.orangeColor
    },
    texto: {
        color: '#000',
        fontSize: Metrics.fontL,
    },
    ultimoAviso: {
        padding: Metrics.marginS,
        width: wp('100%'),
    },
    cardToService: {
        margin: Metrics.marginS,
        padding: Metrics.marginS,
        borderRadius:Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: '#888',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: '#dedede'
    },
    alertStyle: {
        flex: 1,
        flexDirection: 'row',
        width: wp('70%'),
        justifyContent: 'space-evenly',
        marginVertical: Metrics.marginS,
    },
    alertText: {
        color: Colors.orangeColor,
        fontSize: Metrics.fontL,
        fontWeight: 'bold'
    },
    cardText: {
        marginVertical: Metrics.marginS,
        fontSize: Metrics.fontM,
        fontWeight: 'bold'
    },
    icoContainer: {
        padding: Metrics.marginS,
        borderRadius: Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: '#bbb',
        alignItems: 'center',
        height:  Metrics.iconMedium,
        width: Metrics.iconMedium,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#88888855'
    },
    simpleText: {
        fontSize: Metrics.fontS
    }
});