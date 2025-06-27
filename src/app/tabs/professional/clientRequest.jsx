import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import BackButton from "../../../components/BackButton";
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
        position: "absolute",
        bottom: 0,
        height: Metrics.screenM,
        alignItems: "stretch",
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
        padding: Metrics.marginS,
        marginVertical: Metrics.marginS,
        borderRadius: Metrics.radiusS
    },
    boxTitle: {
        fontWeight: 900,
        fontSize: Metrics.fontM,
    },
    img: {
        width: 200,
        height: 200,
        borderColor: '#000',
        borderWidth: Metrics.marginXS,
        borderRadius: Metrics.radiusS,
        margin: Metrics.marginS,
    },
    imageScroll: {
        flex: 1,
        flexDirection: 'row',
        padding: Metrics.marginS,
        marginTop: Metrics.marginS,
    }
});