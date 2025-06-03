import { useLocalSearchParams } from 'expo-router';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";
import { Colors } from '../../../constants/Colors';
import BackButton from '../../../components/BackButton';
import ProfilePic from '../../../components/ProfilePic';
import SlideUpCard from '../../../components/SlideUpCard';
import NavBar from '../../../components/NavBar';
import Rate from '../../../components/Rate';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

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
        fontSize: 16,
        padding: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: 'black',
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        padding: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: 'black',
        marginBottom: 10,
    },
};

export default function HomeScreen() {
    const [nombre, setNombre] = useState('');
    const [profesion, setProfesion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [colorFondo, setColorFondo] = useState('darkseagreen');

    const coloresDisponibles = [
    'darkseagreen', 'lightblue', 'lightpink', 'khaki', 'lightgray', 'plum'
    ];

    const finalizarEdicion = () => {
        router.replace('/tabs/professional/home?publicitado=true');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="auto" />
            <BackButton />
            <View style={styles.profileContainer}>
            <ProfilePic uri={'https://randomuser.me/api/portraits/men/73.jpg'} size="100" />
            <View style={styles.titleRateContainer}>
                <Text style={styles.title}>AUTOPUBLICITACION</Text>
                <Rate rating={3} reviews={95} />
            </View>
            </View>

            <SlideUpCard style={styles.slideUpCard} title="Publicidad" subtitle="Personalización">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={hp('20%')}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 10 }}>
                        {coloresDisponibles.map((color) => (
                            <Pressable
                            key={color}
                            onPress={() => setColorFondo(color)}
                            style={{
                                backgroundColor: color,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
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
                    <Button title="Finalizar edición" onPress={finalizarEdicion} />
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
    slideUpCard: {
        flex: 1,
        borderTopRightRadius: wp('30%'),
        borderTopLeftRadius: 0,
        marginTop: hp('1%'),
        justifyContent: 'flex-start',
        paddingBottom: 0
    },
    prevView: {
        backgroundColor: 'darkseagreen',
        width: '100%',
        height: 200,
        zIndex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#030',
        borderStyle: 'solid',
        position: 'relative'
    },
    encabezadoContainer: {
        width: '100%',
        paddingLeft: '4%',
        marginBottom: -11,
        zIndex: 2,
    },
    encabezado: {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'darkseagreen',
        width: '20%',
        textAlign: 'center',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#030',
        borderStyle: 'solid',
    },
    leftView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingLeft: '1%',
        paddingRight: '7%',
        width: '33.3%',
        height: '100%',
        position: 'absolute',
        left: 0,
        gap: '20%'
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '45%',
        height: '100%',
        borderRadius: '50%',
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
        width: '90%',
        height: '90%',
        borderRadius: '50%',
        elevation: 10,
        padding: 1,
    },
    rightView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '7%',
        paddingRight: '1%',
        backgroundColor: 'transparent',
        width: '33.3%',
        height: '100%',
        position: 'absolute',
        right: 1
    },
    textToEdit: {
        textAlign: 'center',
        fontSize: 20
    },
    contenedor: {
        marginTop: '8%',
        width: wp('90%'),
        gap: 12,
    },
    input: {
        borderWidth: 3,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
    },
        selectorContainer: {
        marginTop: 20,
        width: wp('90%'),
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    }
});