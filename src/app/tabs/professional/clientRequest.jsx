import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Text } from "react-native";
import SlideUpCard from "../../../components/SlideUpCard";
import BackButton from "../../../components/BackButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from "react-native";
import NavBar from "../../../components/NavBar";
import CustomButton from "../../../components/CustomButton";

export default function ClientRequest(){
    return(<View style={styles.container}>
        <BackButton />

        <SlideUpCard title='Reparación de Aire Acondicionado' style={styles.slideUpCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.problemDescriptionContainer, styles.box]}>
                    <Text>Problema/s identificado/s:</Text>
                </View>
                <View style={[styles.problemDetailsContainer, styles.box]}>
                    <Text>Detalles del Aire Acondicionado:</Text>
                </View>
                <View style={[styles.problemPhotoContainer, styles.box]}>
                    <Text>Imagen/es:</Text>
                </View>
                <CustomButton text='Enviar Mensaje' onPress={() => console.log('ENVIAR MENSAJE')}/>
            </ScrollView>
        </SlideUpCard>
        <NavBar />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideUpCard: {
        flex: 1,
        marginTop: hp('15%'),
        borderTopRightRadius: 0,
        borderTopLeftRadius: wp('40%'),
        paddingHorizontal: wp('4%'),
    },
    problemDescriptionContainer: {
        height: 200
    },
    problemDetailsContainer: {
        height: 200
    },
    problemPhotoContainer: {
        height: 200
    },
    box: {
        backgroundColor: '#8a8a8a',
        flex: 1,
        padding: wp('3%'),
        marginVertical: hp('0.5%'),
        borderRadius: wp('5%'),
    }
});