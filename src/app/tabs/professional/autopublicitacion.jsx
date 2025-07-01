import { useLocalSearchParams } from 'expo-router';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Colors } from '../../../constants/Colors';
import { Metrics } from '../../../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import BackButton from '../../../components/BackButton';
import CustomButtom from '../../../components/CustomButton';
import ProfilePic from '../../../components/ProfilePic';
import SlideUpCard from '../../../components/SlideUpCard';
import NavBar from '../../../components/NavBar';
import Rate from '../../../components/Rate';
import { Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../utils/storage';

const Inputs = ({ nombre, setNombre, profesion, setProfesion, descripcion, setDescripcion }) => (
  <View style={styles.contenedor}>
    <TextInput
      style={styles.input}
      placeholder="Nombre"
      value={nombre}
      onChangeText={setNombre}
    />
    <TextInput
      style={styles.input}
      placeholder="Profesión"
      value={profesion}
      onChangeText={setProfesion}
    />
    <TextInput
      style={[styles.input, styles.textArea]}
      placeholder="Descripción"
      value={descripcion}
      onChangeText={setDescripcion}
      multiline
      numberOfLines={3}
      textAlignVertical='top'
    />
  </View>
);

const pickerSelectStyles = {
    inputIOS: {
        fontSize: Metrics.fontS,
        padding: Metrics.marginS,
        borderWidth: Metrics.marginXS,
        borderColor: Colors.disabledColor,
        borderRadius: Metrics.radiusS,
        backgroundColor: '#fff',
        color: Colors.textColor,
        marginBottom: Metrics.marginS,
    },
    inputAndroid: {
        fontSize: Metrics.fontS,
        padding: Metrics.marginS,
        borderWidth: Metrics.marginXS,
        borderColor: Colors.disabledColor,
        borderRadius: Metrics.radiusS,
        backgroundColor: '#fff',
        color: Colors.textColor,
        marginBottom: Metrics.marginS,
    },
};

export default function HomeScreen() {
    const [nombre, setNombre] = useState('');
    const [profesion, setProfesion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [colorFondo, setColorFondo] = useState('darkseagreen');
    const [userProfile, setUserProfile] = useState(null);

    const coloresDisponibles = [
    'darkseagreen', 'lightblue', 'lightpink', 'khaki', 'lightgray', 'plum'
    ];

    useEffect(() => {
        const loadUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            if (profile) {
                setUserProfile(profile);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
        };
        loadUserProfile();
    }, []);

    const finalizarEdicion = () => {
        const camposVacios = [];
        if(nombre.trim() === '') camposVacios.push('Nombre');
        if(profesion.trim() === '') camposVacios.push('Profesión');
        if(descripcion.trim() === '') camposVacios.push('Descripción');
        
        if(camposVacios.length > 0) {
            Alert.alert(
                'Campos vacíos',
                `Por favor, completá los siguientes campos: ${camposVacios.join(', ')}`,
                [{ text: 'OK' }]
            );
            return;
        }
        router.replace('/tabs/professional/home?publicitado=true');
    }

    return (<SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <BackButton />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'android' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Metrics.navBarArea}
            >
                <View style={styles.profileContainer}>
                    <ProfilePic uri={userProfile?.avatar} size="100" />
                    <View style={styles.titleRateContainer}>
                        <Text style={styles.title}>
                            Hola, { userProfile
                                    ? userProfile.fullName || 'Profesional'
                                    : 'cargando...'
                            }
                        </Text>
                        <Rate rating={3} reviews={95} />
                    </View>
                </View>


                <SlideUpCard style={styles.slideUpCard} title="Publicidad" subtitle="Personalización">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scroll}
                    >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Metrics.marginS, padding: Metrics.marginS, }}>
                            {coloresDisponibles.map((color) => (
                                <Pressable
                                    key={color}
                                    onPress={() => setColorFondo(color)}
                                    style={{
                                        backgroundColor: color,
                                        width: 35,
                                        height: 35,
                                        borderRadius: Metrics.radiusS,
                                        borderWidth: colorFondo === color ? 3 : 1,
                                        borderColor: colorFondo === color ? Colors.textColor : Colors.disabledColor,
                                    }}
                                />
                            ))}
                        </View>

                        <View style={[styles.encabezadoContainer]}>
                            <Text style={[styles.encabezado, { backgroundColor: colorFondo }]}>Vista Previa</Text>
                        </View>

                        <View style={[styles.prevView, { backgroundColor: colorFondo }]}>
                            <View style={styles.leftView}>
                                <Text style={styles.textToEdit}>{nombre || 'Martín Joaquín Gonzalez'}</Text>
                                <Text style={styles.textToEdit}>{profesion || 'Peluquería'}</Text>
                            </View>
                            <View style={styles.centerView}>
                                <View style={styles.innerCenterView}>
                                    <Text style={{textAlign: 'center'}}>{descripcion || 'Descripción...'}</Text>
                                </View>
                            </View>
                            <View style={styles.rightView}>
                                <Text style={[styles.textToEdit, { textAlign:'center' }]}>(+) Agregar una imagen descriptiva</Text>
                            </View>
                        </View>

                        <Inputs
                            nombre={nombre}
                            setNombre={setNombre}
                            profesion={profesion}
                            setProfesion={setProfesion}
                            descripcion={descripcion}
                            setDescripcion={setDescripcion}
                        />
                        <CustomButtom
                            text="Finalizar edición"
                            onPress={finalizarEdicion}
                            width={wp('85%')}
                        />
                    </ScrollView>
                </SlideUpCard>
            </KeyboardAvoidingView>
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
        alignItems: "center",
    },
    profileContainer: {
        flexDirection: 'row',
        width: '95%',
        padding: Metrics.marginS,
        justifyContent: 'space-between',
        marginTop: Metrics.marginTotal,
    },
    scroll: {
        width: wp("100%"),
        paddingHorizontal: Metrics.marginS,  
        paddingTop: Metrics.marginS,
        paddingBottom: Metrics.marginL,
        justifyContent: "center",
    },
    titleRateContainer: {
        flex: 1,
        flexDirection: 'column',
        width: wp('80%'),
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
    slideUpCard: { 
        maxHeight: Metrics.screenM,
    },
    prevView: {
        width: wp("85%"),
        height: Metrics.editPublicity,
        zIndex: 1,
        flexDirection: 'row',
        borderRadius: Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: '#030',
        position: 'relative'
    },
    encabezadoContainer: {
        width: wp('100%'),
        paddingLeft: Metrics.marginL,
        marginBottom: -11,
        zIndex: 2,
    },
    encabezado: {
        fontWeight: 'bold',
        color: '#fff',
        width: wp('30%'),
        textAlign: 'center',
        borderRadius: Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: '#030',
        borderStyle: 'solid',
    },
    leftView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        paddingLeft: Metrics.marginS,
        paddingRight: Metrics.marginM,
        width: '35%',
        height: '100%',
        position: 'absolute',
        left: 0,
    },
    centerView: {
        width: '45%',
        height: '90%',
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: '-50%' }],
        top: '5%',
        zIndex: 1
    },
    innerCenterView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        borderRadius: '50%',
        elevation: 10,
        padding: Metrics.marginXS,
    },
    rightView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: Metrics.marginL,
        paddingRight: Metrics.marginS,
        backgroundColor: 'transparent',
        width: '30%',
        height: '100%',
        position: 'absolute',
        right: 0
    },
    textToEdit: {
        textAlign: 'flex-start',
        fontSize: Metrics.fontXS,
    },
    contenedor: {
        marginTop: Metrics.marginS,
        marginBottom: 0,
        paddingBottom: 0,
        width: '90%',
        gap: Metrics.marginS,
    },
    input: {
        borderWidth: Metrics.marginXS,
        borderColor: Colors.disabledColor,
        borderRadius: Metrics.radiusS,
        padding: Metrics.marginS,
        fontSize: Metrics.fontS,
        backgroundColor: '#fff',
        marginBottom: Metrics.marginS,
    },
    textArea: {
        height: Metrics.editPublicity,
    },
    selectorContainer: {
        marginTop: Metrics.marginS,
        width: wp('90%'),
        alignSelf: 'center',
    },
    label: {
        fontSize: Metrics.fontS,
        fontWeight: 'bold',
        marginBottom: Metrics.marginS,
        color: '#333',
    }
});