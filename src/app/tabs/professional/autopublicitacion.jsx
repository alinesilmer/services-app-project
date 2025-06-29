import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, TextInput, Pressable, StatusBar, StyleSheet, Text, View, Button } from "react-native";
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
import { Feather, FontAwesome5 } from '@expo/vector-icons';
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
      numberOfLines={4}
      textAlignVertical='top'
    />
  </View>
);

const pickerSelectStyles = {
    inputIOS: {
        fontSize: Metrics.fontS,
        padding: Metrics.marginS,
        borderWidth: Metrics.marginXS,
        borderColor: '#ccc',
        borderRadius: Metrics.radiusS,
        backgroundColor: '#fff',
        color: Colors.textColor,
        marginBottom: Metrics.marginS,
    },
    inputAndroid: {
        fontSize: Metrics.fontS,
        padding: Metrics.marginS,
        borderWidth: Metrics.marginXS,
        borderColor: '#ccc',
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

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <BackButton />
            <View style={styles.profileContainer}>
            <ProfilePic uri={userProfile?.avatar} size="100" />
            <View style={styles.titleRateContainer}>
                <Text style={styles.title}>
                    HOLA, { userProfile
                            ? userProfile.fullName.toUpperCase() || 'Profesional'
                            : 'cargando...'
                    }
                </Text>
                <Rate rating={3} reviews={95} />
            </View>
            </View>

            <SlideUpCard style={styles.slideUpCard} title="Publicidad" subtitle="Personalización">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Metrics.navBarArea}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Metrics.marginS }}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Metrics.marginS, padding: Metrics.marginS }}>
                        {coloresDisponibles.map((color) => (
                            <Pressable
                            key={color}
                            onPress={() => setColorFondo(color)}
                            style={{
                                backgroundColor: color,
                                width: 40,
                                height: 40,
                                borderRadius: Metrics.radiusS,
                                borderWidth: colorFondo === color ? 3 : 1,
                                borderColor: colorFondo === color ? '#000' : '#ccc',
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
                                <Text>{descripcion || 'Descripción...'}</Text>
                            </View>
                        </View>
                        <View style={styles.rightView}>
                            <Text style={styles.textToEdit}>(+) Agregar una imagen descriptiva</Text>
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
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            </SlideUpCard>

            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blueColor,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    profileContainer: {
        flexDirection: 'row',
        width: wp('80%'),
        height: Metrics.screenM,
        padding: Metrics.marginS,
        justifyContent: 'space-between',
        marginTop: Metrics.marginM,
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
        position: "absolute",
        bottom: 0,
        height: Metrics.screenM,
        alignItems: "stretch",
    },
    prevView: {
        backgroundColor: 'darkseagreen',
        width: wp('100%'),
        height: Metrics.screenM,
        zIndex: 1,
        flexDirection: 'row',
        borderRadius: Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: '#030',
        position: 'relative'
    },
    encabezadoContainer: {
        width: wp('100%'),
        paddingLeft: Metrics.marginS,
        marginBottom: -11,
        zIndex: 2,
    },
    encabezado: {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'darkseagreen',
        width: '20%',
        textAlign: 'center',
        borderRadius: Metrics.radiusS,
        borderWidth: Metrics.marginXS,
        borderColor: '#030',
        borderStyle: 'solid',
    },
    leftView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingLeft: Metrics.marginS,
        paddingRight: Metrics.marginS,
        width: '35%',
        height: Metrics.screenM,
        position: 'absolute',
        left: 0,
        gap: Metrics.marginS,
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '45%',
        height: Metrics.screenM,
        borderRadius: Metrics.radiusM,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: '-50%' }],
        top: 0,
        zIndex: 1
    },
    innerCenterView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        width: wp('90%'),
        height: Metrics.screenS,
        borderRadius: Metrics.radiusM,
        elevation: 10,
        padding: Metrics.marginXS,
    },
    rightView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: Metrics.marginS,
        paddingRight: Metrics.marginS,
        backgroundColor: 'transparent',
        width: '30%',
        height: '100%',
        position: 'absolute',
        right: 1
    },
    textToEdit: {
        textAlign: 'center',
        fontSize: Metrics.fontS,
    },
    contenedor: {
        marginTop: Metrics.marginS,
        width: wp('90%'),
        gap: Metrics.marginS,
    },
    input: {
        borderWidth: Metrics.marginXS,
        borderColor: '#ccc',
        borderRadius: Metrics.radiusS,
        padding: Metrics.marginS,
        fontSize: Metrics.fontS,
        backgroundColor: '#fff',
        marginBottom: Metrics.marginS,
    },
    textArea: {
        height: "100%",
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