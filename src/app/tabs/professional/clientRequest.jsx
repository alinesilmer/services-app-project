import { Image, SafeAreaView, StyleSheet, View } from "react-native";
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

    return(<SafeAreaView style={styles.container}>
        <BackButton />

        <ClientRequestSlide
            title={title}
            problems={problems}
            details={details}
            images={images}
        />
        <NavBar />
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueColor,
        alignContent: 'center'
    }
});