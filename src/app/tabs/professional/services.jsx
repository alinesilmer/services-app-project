import { StatusBar, StyleSheet } from "react-native";
import { getUserProfile, saveUserProfile } from "../../../utils/storage";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Colors } from "../../../constants/Colors";


export default function ProfessionalServices() {
    return(<View style={styles.container}>
        <StatusBar barStyle='light-content'/>
    
    

    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueColor
    }
});