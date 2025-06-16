import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { getUserProfile, saveUserProfile } from "../../../utils/storage";
import { useState, useEffect } from "react";
import { Colors } from "../../../constants/Colors";
import NavBar from "../../../components/NavBar";
import IconButton from "../../../components/IconButton";
import SlideUpCard from "../../../components/SlideUpCard";
import Services from "../../../data/mockServices";
import { categoriesIcons } from "../../../data/mockCategories";
import mockServices from "../../../data/mockServices";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCompleteUserData } from "../../../utils/storage"; 
import ProfilePic from "../../../components/ProfilePic";
import BackButton from "../../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";


export default function ProfessionalServices() {
    const [usuario, setUsuario] = useState(null);
    
    useEffect(() => {
        const cargarDatosUsuario = async () => {
            const datos = await getCompleteUserData();
            setUsuario(datos);
        }
        cargarDatosUsuario();
    }, []);
    
    if (!usuario) {
        return (
            <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" backgroundColor={Colors.primary} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Cargando perfil...</Text>
          </View>
        </SafeAreaView>
      );
    }
    
    const professionalServices = mockServices.filter(
        (service) => service.idProfesional === Number.parseInt(usuario.id),
    )

    const getServicePrice = (serviceName) => {
        const service = mockServices.find(
            (s) => s.servicio === serviceName && s.idProfesional === Number.parseInt(usuario.id),
        )

        if (service) {
            return service.precio === 0 ? "Gratis" : `Desde $${service.precio.toLocaleString()}`
        }

        return "Consultar precio"
    }
    
    const SERVICES = Services.filter(serv => serv.idProfesional === usuario.id);
    return(<View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <BackButton />

        <Text style={styles.editTitle}>EDITAR SERVICIOS</Text>
        <SlideUpCard style={styles.slideUpCard}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePhoto}>
                    <ProfilePic uri={usuario?.avatar} size='130'/>
                </View>
                <View>
                    <Text style={styles.userProfile}>
                        {usuario
                            ? usuario.fullName.toUpperCase() || 'Profesional'
                            : 'cargando...'
                        }
                    </Text>
                    <Text style= {styles.userAddress}>📍 Ubicación: {usuario.address}</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={ styles.scroll}>
                <View style={styles.servicesContainer}>
                    {professionalServices.map((serviceObj, index) => (
                        <TouchableOpacity
                        key={index}
                        style={styles.serviceItem}
                        onPress={() => console.log('Pressed')}
                        activeOpacity={0.7}
                        >
                            <View style={styles.serviceContent}>
                                <View style={styles.serviceIcon}>
                                    <Feather name="image" size={20} color={Colors.blueColor} />
                                </View>
                                <View style={styles.serviceInfo}>
                                    <Text style={styles.serviceName}>{serviceObj.servicio}</Text>
                                    <Text style={styles.servicePrice}>{getServicePrice(serviceObj.servicio)}</Text>
                                </View>
                                <View style={styles.editIcons}>
                                    <TouchableOpacity>
                                        <Feather name="edit-3" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Feather name="trash-2" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            </SlideUpCard>
        <NavBar />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueColor
    },
    editTitle: {
        marginTop: hp('4%'),
        marginHorizontal: 'auto',
        fontSize: wp('8%'),
        fontWeight: 900
    },
    profileContainer: {
        flexDirection: 'row',
        width: wp('100%'),
        justifyContent: 'space-evenly',
        marginBottom: hp('5%'),
    },
    profilePhoto: {
        borderColor: '#000',
        borderWidth: wp('1%'),
        borderStyle: 'solid',
        borderRadius: '50%',
    },
    userProfile: {
        fontSize: wp('5%'),
        fontWeight: 700,
        marginVertical: 'auto',
    },
    userAddress: {
        fontSize: wp('4%'),
    },
    slideUpCard: {
        borderTopLeftRadius: wp('40%'),
        borderTopRightRadius: wp('0'),
        marginTop: hp('10'),
        height: hp('80%'),
    },
    servicesContainer: {
        marginBottom: 0,
    },
    serviceItem: {
        backgroundColor: "#f8f9fa",
        borderRadius: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    serviceContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        minWidth: wp('65%'),
    },
    serviceIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#e3f2fd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    serviceInfo: {
        flex: 1,
    },
    editIcons: {
        width: wp('17%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    serviceName: {
        fontSize: wp("4%"),
        fontWeight: "600",
        color: "#333",
        marginBottom: 3,
    },
    servicePrice: {
        fontSize: wp("3.5%"),
        color: "#666",
    },
    scroll: { 
        paddingHorizontal: wp('1%'),
        width: wp('85%'),
    }
});