import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import BackButton from "../../../components/BackButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavBar from "../../../components/NavBar";
import { useLocalSearchParams } from 'expo-router';
import ClientRequestSlide from "../../../components/ClientRequestSlide";

export default function ClientRequest(){
    let {title, problems, details, images} = useLocalSearchParams();
    problems = JSON.parse(problems || '[]');
    details = JSON.parse(details || '[]');
    images = JSON.parse(images || '[]');

    return(<View style={styles.container}>
        <BackButton />

        <ClientRequestSlide
            title={title}
            problems={problems}
            details={details}
            images={images}
        />
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
        paddingHorizontal: wp('5%'),
    },
    problemDescriptionContainer: {
    },
    problemDetailsContainer: {
    },
    problemPhotoContainer: {
    },
    box: {
        backgroundColor: '#dcdcdc',
        flex: 1,
        padding: wp('4%'),
        marginVertical: hp('0.5%'),
        borderRadius: wp('2.5%'),
    },
    boxTitle: {
        fontWeight: 900,
        fontSize: wp('4%'),
    },
    img: {
        width: 200,
        height: 200,
        borderColor: '#000',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: wp('2.5%'),
        margin: wp('1%'),
    },
    imageScroll: {
        flex: 1,
        flexDirection: 'row',
        padding: wp('1%'),
        marginTop: hp('1%'),
    }
});