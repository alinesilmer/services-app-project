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
import ServiceItem from "../../../components/ServiceItem";
import BackButton from "../../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { router } from "expo-router";


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

        <SlideUpCard title={`Servicios\nPrecios`} style={styles.slideUpCard}>
            <IconButton
                name="edit"
                size={24}
                color={Colors.textColor}
                style={styles.editButton}
                onPress={() => router.push('/tabs/professional/editServices')}
            />
            
            <View style={styles.squareButtonsContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.squareButton}>
                    <Text style={styles.squareButtonIcon}>{categoriesIcons[usuario.profesion]}</Text>
                    <Text style={styles.squareButtonText}>{usuario.profesion}</Text>
                </TouchableOpacity>
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
    slideUpCard: {
        borderTopLeftRadius: wp('40%'),
        borderTopRightRadius: wp('0'),
        marginTop: hp('10'),
        maxHeight: hp('88'),
    },
    editButton: {
        marginTop: '-25%',
        marginLeft: '80%',
    },
    squareButtonsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'center',
        marginTop: wp('17%'),
        marginHorizontal: wp("5%"),
        marginBottom: hp("2%"),
        gap: wp('2%'),
        width: wp(80),
    },
    squareButton: {
        backgroundColor: "#fff",
        width: wp("25%"),
        height: wp("25%"),
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        borderWidth: 1,
        borderColor: "black",
    },
    squareButtonIcon: {
        fontSize: wp("6%"),
        marginBottom: hp("0.5%"),
    },
    squareButtonText: {
        fontSize: wp("3%"),
        fontWeight: "600",
        textAlign: "center",
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
    }
});