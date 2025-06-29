import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import NavBar from "../../../components/NavBar";
import IconButton from "../../../components/IconButton";
import SlideUpCard from "../../../components/SlideUpCard";
import Services from "../../../data/mockServices";
import { categoriesIcons } from "../../../data/mockCategories";
import mockServices from "../../../data/mockServices";
import { getCompleteUserData } from "../../../utils/storage"; 
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
            <Text style={{ color: Colors.whiteColor, fontSize: Metrics.fontM }}>Cargando perfil...</Text>
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
                size={Metrics.iconMedium}
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
        backgroundColor: Colors.blueColor,
        alignItems: "center",
        justifyContent: "center",
    },
    slideUpCard: {
        position: "absolute",
        bottom: 0,
        height: Metrics.screenM,
        alignItems: "stretch",
    },
    editButton: {
        marginTop: Metrics.marginM,
        marginLeft: Metrics.marginM,
    },
    squareButtonsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'center',
        marginTop: Metrics.marginS,
        marginHorizontal: Metrics.marginS,
        marginBottom: Metrics.marginS,
        gap: Metrics.marginS,
        width: wp('80%'),
    },
    squareButton: {
        backgroundColor: "#fff",
        width: Metrics.iconLarge,
        height: Metrics.iconLarge,
        borderRadius: Metrics.radiusS,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        borderWidth: Metrics.marginXS,
        borderColor: Colors.textColor
    },
    squareButtonIcon: {
        fontSize: Metrics.iconXLarge,
        marginBottom: Metrics.marginS,
    },
    squareButtonText: {
        fontSize: Metrics.fontXS,
        fontWeight: "600",
        textAlign: "center",
    },
    servicesContainer: {
        marginBottom: Metrics.marginXS,
    },
    serviceItem: {
        backgroundColor: "#f8f9fa",
        borderRadius: Metrics.radiusS,
        marginBottom: Metrics.marginS,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: Metrics.radiusS
    },
    serviceContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: Metrics.marginS,
        minWidth: wp('65%'),
    },
    serviceIcon: {
        width: Metrics.iconXLarge,
        height: Metrics.iconXLarge,
        borderRadius: Metrics.radiusS,
        backgroundColor: "#e3f2fd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: Metrics.marginS,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: Metrics.fontL,
        fontWeight: "600",
        color: "#333",
        marginBottom: Metrics.marginS,
    },
    servicePrice: {
        fontSize: Metrics.fontM,
        color: "#666",
    },
    scroll: { 
        paddingHorizontal: Metrics.marginS,
    }
});