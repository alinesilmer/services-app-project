import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import NavBar from "../../../components/NavBar";
import SlideUpCard from "../../../components/SlideUpCard";
import Services from "../../../data/mockServices";
import mockServices from "../../../data/mockServices";
import { getCompleteUserData } from "../../../utils/storage"; 
import ProfilePic from "../../../components/ProfilePic";
import BackButton from "../../../components/BackButton";
import ModalWrapper from "../../../components/ModalWrapper";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";


export default function ProfessionalServices() {
    const [usuario, setUsuario] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    
    const [services, setServices] = useState([]);
    const [professionalServices, setProfessionalServices] = useState([]);

    useEffect(() => {
    const cargarDatosUsuario = async () => {
        const datos = await getCompleteUserData();
        setUsuario(datos);

        if (datos) {
        const filtrados = mockServices.filter(
            (service) => service.idProfesional === Number.parseInt(datos.id)
        );
        setServices(filtrados);
        setProfessionalServices(filtrados);
        }
    };
    cargarDatosUsuario();
    }, []);
    
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
            <Text style={{ color: Colors.whiteColor, fontSize: Metrics.fontS }}>Cargando perfil...</Text>
          </View>
        </SafeAreaView>
      );
    }
    
    

    const getServicePrice = (serviceName) => {
        const service = mockServices.find(
            (s) => s.servicio === serviceName && s.idProfesional === Number.parseInt(usuario.id),
        )

        if (service) {
            return service.precio === 0 ? "Gratis" : `Desde $${service.precio.toLocaleString()}`
        }

        return "Consultar precio"
    }
    
    const openServiceModal = (service = null) => {
        setEditingService(service);
        setModalVisible(true);
    }

    const handleSaveService = (servicio, precio) => {
        if (!servicio || !precio) return;

        if (editingService) {
            
            const serviciosActualizados = services.map((s) =>
            s.id === editingService.id ? { ...s, servicio, precio } : s
            );
            setServices(serviciosActualizados);
            setProfessionalServices(serviciosActualizados);
        } else {
            
            const nuevoID = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;

            const nuevoServicio = {
            id: nuevoID,
            servicio,
            precio,
            idProfesional: Number(usuario.id),
            };

            const serviciosActualizados = [...services, nuevoServicio];
            setServices(serviciosActualizados);
            setProfessionalServices(serviciosActualizados);
        }

        setModalVisible(false);
        setEditingService(null);
        setServiceName('');
        setServicePrice('');
    };

    const handleDeleteService = (id) => {
        setServices( prev => prev.filter(s => s.id !== id))
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
            

            <Text style={[styles.userProfile, { marginLeft: Metrics.marginM}]}>Servicios que Ofrezco{'\n'}</Text>
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
                                    <Feather name="image" size={Metrics.iconXSmall} color={Colors.blueColor} />
                                </View>
                                <View style={styles.serviceInfo}>
                                    <Text style={styles.serviceName}>{serviceObj.servicio}</Text>
                                    <Text style={styles.servicePrice}>{getServicePrice(serviceObj.servicio)}</Text>
                                </View>
                                <View style={styles.editIcons}>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => openServiceModal(serviceObj)}>
                                        <Feather name="edit-3" size={Metrics.iconSmall} color={Colors.textColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => handleDeleteService(serviceObj.id)}>
                                        <Feather name="trash-2" size={Metrics.iconSmall} color={Colors.orangeColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.serviceItem}
                        onPress={() => openServiceModal(null)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.serviceContent}>
                            <View style={styles.serviceInfo}>
                                <Text style={[styles.serviceName, {marginHorizontal: 'auto'}]}>Agregar un nuevo servicio</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SlideUpCard>

        <ModalWrapper
            visible={modalVisible}
            title={editingService ? 'Editar servicio' : 'Agregar servicio'}
            onCancel={() => {
                setModalVisible(false);
                setEditingService(null);
            }}
            onSubmit={() => handleSaveService(serviceName, Number(servicePrice))}
        >
            <TextInput
                placeholder='Nombre del servicio'
                value={serviceName}
                onChangeText={setServiceName}
                style= {{ borderBottomWidth: Metrics.marginXS, marginBottom: Metrics.marginS }}
            />
            <TextInput
                placeholder='Precio del servicio'
                value={servicePrice}
                onChangeText={setServicePrice}
                keyboardType="numeric"
                style= {{ borderBottomWidth: Metrics.marginXS, marginBottom: Metrics.marginS }}
            />
        </ModalWrapper>
        <NavBar />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueColor,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    editTitle: {
        marginTop: Metrics.marginS,
        marginHorizontal: 'auto',
        fontSize: Metrics.fontM,
        fontWeight: "bold",
        color: Colors.whiteColor
    },
    profileContainer: {
        flexDirection: 'row',
        width: Metrics.animationXL,
        justifyContent: 'space-evenly',
        marginBottom: Metrics.marginXS,
    },
    profilePhoto: {
        borderColor: Colors.textColor,
        borderWidth: Metrics.marginXS,
        borderRadius: Metrics.radiusM,
    },
    userProfile: {
        fontSize: Metrics.fontL,
        fontWeight: "bold",
        marginVertical: 'auto',
        marginLeft: Metrics.marginM,
        
    },
    userAddress: {
        fontSize: Metrics.fontXS,
        textAlign: "center"
        
    },
    slideUpCard: {
        position: "absolute",
        bottom: 0,
        height: Metrics.screenL,
        alignItems: "stretch",
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
        minWidth: '65%',
    },
    serviceIcon: {
        width: 40,
        height: 40,
        borderRadius: Metrics.radiusS,
        backgroundColor: "#e3f2fd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: Metrics.marginS,
    },
    serviceInfo: {
        flex: 1,
    },
    editIcons: {
        width: Metrics.iconXXXLarge,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    serviceName: {
        fontSize: Metrics.fontS,
        fontWeight: "bold",
        color: Colors.textColor,
        marginBottom: Metrics.marginS,
    },
    servicePrice: {
        fontSize: Metrics.fontXS,
        color: "#666",
    },
    scroll: { 
        paddingHorizontal: Metrics.marginS,
        width: wp('85%'),
    }
});