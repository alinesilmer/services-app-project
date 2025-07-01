import { useLocalSearchParams } from 'expo-router';
import {
    Alert,
    Modal,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Colors } from '../../../constants/Colors';
import { Metrics } from '../../../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import ProfilePic from '../../../components/ProfilePic';
import CustomButton from '../../../components/CustomButton';
import SlideUpCard from '../../../components/SlideUpCard';
import NavBar from '../../../components/NavBar';
import Rate from '../../../components/Rate';
import ModalWrapper from '../../../components/ModalWrapper';
import { ClientRequest } from '../../../data/mockClientRequest';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../utils/storage';
import { FlatList } from 'react-native';
import { ClientRequestCard } from '../../../components/ClientRequestCard';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default Home = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [profesion, setProfesion] = useState('');
    const { publicitado } = useLocalSearchParams();
    const [isPublicitado, setIsPublicitado] = useState(publicitado === 'true');
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const ModalProfesion = ({ visible, onClose, onConfirm }) => {
        const [inputValue, setInputValue] = useState('');

        const confirmar = () => {
            if (inputValue.trim() !== '') {
                onConfirm(inputValue.trim());
            }
        };
        return(<Modal
            visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.invisibleModalText}>¿Cuál es tu profesión?</Text>
					<TextInput
						style={styles.input}
						value={inputValue}
						onChangeText={setInputValue}
						placeholder="Ingresa tu profesión"
					/>
					<View style={styles.buttonRow}>
						<CustomButton
							text="Cancelar"
							onPress={onClose}
							width="40%"
						/>
						<CustomButton
							text="Confirmar"
							onPress={confirmar}
							width="40%"
						/>
					</View>
				</View>
			</View>
        </Modal>);
    }

    const actualizarProfesion = async (nuevaProfesion) => {
		if (!userProfile) return;

		const actualizado = { ...userProfile, profesion: nuevaProfesion };
		setUserProfile(actualizado);

		// Persistir en AsyncStorage
		await AsyncStorage.setItem('user_profile', JSON.stringify(actualizado));

		setIsModalVisible(false);
	};

    const Icono = ({nom='spa', size=Metrics.iconSmall}) => (
        <View style={styles.icoContainer}>
            <FontAwesome5 name={nom} size={size} color={Colors.disabledColor} />
        </View>
    );
    const updateProfesion = () => {};
    const requests = prof => ClientRequest.filter(req => req.category === prof);
    const ClientRequestFlatList = () => {
        const coincidencias = requests(userProfile.profesion);

        return <>
            {coincidencias.length > 0 ? (
                <FlatList
                    data={coincidencias}
                    renderItem={({item}) => (
                        <ClientRequestCard
                            item={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            ) : (<Text style={styles.invisibleModalText}>
                No Hay aún solicitudes de clientes para tu profesión.
            </Text>)}
        </>
    }

    return (<SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle='auto'/>
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <ProfilePic uri={userProfile?.avatar} size={Metrics.iconXLarge}/>
                <View style={styles.titleRateContainer}>
                    <Text style={styles.title}>
                        Hola, {userProfile
                                ? userProfile.fullName || 'Profesional'
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
                    <Text style={styles.iconText}>Belleza</Text>
                </View>
                <Feather name='chevron-right' size={Metrics.iconSmall} color={Colors.disabledColor}/>
                <View style={styles.iconView}>
                    <Icono nom='cut'/>
                    <Text style={styles.iconText}>Peluquería</Text>
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

            <SlideUpCard
                style={styles.slideUpCard}
                title={'Solicitudes de clientes'}
                subtitle={'Según tu profesión'}
            >
                {userProfile?.profesion ? (
                    <ClientRequestFlatList />
                ) : (
                    <View style={styles.modalContainer}>
                        {isModalVisible ? null : (
                            <View style={styles.modalNoVisible}>
                                <Text style={styles.invisibleModalText}>Aún no has indicado tu profesión.</Text>
                                <Text style={styles.invisibleModalText}>Hazlo ahora y descubre quién necesita de tu talento.</Text>
                                <CustomButton
                                    text={'Añade tu profesión'}
                                    onPress={() => setIsModalVisible(true)}
                                    width={'60%'}
                                />
                            </View>
                        )}

                        <ModalProfesion
                            visible={isModalVisible}
                            onClose={() => setIsModalVisible(false)}
                            onConfirm={actualizarProfesion}
                        />
                    </View>
                )}
            </SlideUpCard>
        </View>
        <NavBar />
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.blueColor,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    profileContainer: {
        flexDirection: 'row',
        height: Metrics.publicityArea,
        padding: Metrics.marginS,
        alignItems: 'center',
        marginTop: Metrics.marginS,
    },
    titleRateContainer: {
        flex: 1,
        alignItems: 'center',
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
        marginVertical: Metrics.marginS,
        width: '100%',
    },
    iconView: {
        gap: Metrics.marginXS,
    },
    iconText: {
        textAlign: 'center',
        color: Colors.disabledColor,
    },
    slideUpCard: {
        position: "absolute",
        bottom: 0,
        height: Metrics.screenS,
        alignItems: "stretch",
    },
    editProfesion: {
    },
    editProfesionContainer: {
        marginTop: -Metrics.marginXXL,
        marginBottom: Metrics.marginM,
        alignItems: 'flex-end',
        width: '90%',
    },
    buttonContainer: {
        marginTop: Metrics.marginXS,
        width: wp('100%'),
        padding: Metrics.marginS,
        paddingLeft: Metrics.marginXL,
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
        color: Colors.textColor,
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
        width: Metrics.iconXXLarge,
        height: Metrics.iconXXLarge,
        borderRadius: Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: Colors.disabledColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#88888855'
    },
    simpleText: {
        fontSize: Metrics.fontS
    },
    modalContainer: {},
    modalNoVisible: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: Metrics.editPublicity
    },
    modalOverlay: {
        flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
		justifyContent: 'center',
		alignItems: 'center',
    },
    modalContent: {
        width: '80%',
		backgroundColor: Colors.whiteColor,
		padding: Metrics.marginM,
		borderRadius: Metrics.radiusS,
		elevation: 5,
    },
    input: {
		borderWidth: 1,
		borderColor: Colors.disabledColor,
		paddingVertical: Metrics.marginS,
        paddingHorizontal: Metrics.marginM,
		marginVertical: Metrics.marginS,
		borderRadius: Metrics.radiusS,
    },
    buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: Metrics.marginXS,
    },
    invisibleModalText: {
        fontSize: Metrics.fontS,
        fontWeight: 700,
        color: Colors.blueColor,
        textAlign: 'center',
    }
});