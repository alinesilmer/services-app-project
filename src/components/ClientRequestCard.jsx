import { Text, View, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export const ClientRequestCard = ({ item }) => {

    const routeToMoreDetails = () => {
        router.push({
            pathname: '/tabs/professional/clientRequest',
            params: {
                title: item.title,
                problems: JSON.stringify(item.problems),
                details: JSON.stringify(item.details),
                images: JSON.stringify(item.images),
            }
        });
    }

    return(<>
        <View style={styles.requestCard}>
            <View style={styles.alertStyle}>
                <Feather name='alert-circle' size={35} color={Colors.orangeColor}/>
                <Text style={styles.alertText}>¡SE NECESITA!</Text>
            </View>
            <Text style={styles.titleCard}>{item.title}</Text>
            <Pressable onPress={routeToMoreDetails} style={({ pressed }) => [
                styles.boton,
                pressed && styles.botonPresionado
            ]}>
                <Text style={styles.texto}>Ver detalles ...</Text>
            </Pressable>
        </View>
    </>);
}

const styles = StyleSheet.create({
    requestCard: {
        margin: wp('1%'),
        padding: hp('1%'),
        paddingHorizontal: hp('3%'),
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
        width: '90%',
        justifyContent: 'space-evenly',
        marginVertical: '1%'
    },
    alertText: {
        color: Colors.orangeColor,
        fontSize: 32,
        fontWeight: 'bold'
    },
    titleCard: {
        marginVertical: '2%',
        fontSize: 20,
        fontWeight: 'bold'
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
    }
});