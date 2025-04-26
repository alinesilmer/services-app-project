import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Notifications = () => {
    const [isDropped, setDropped] = useState(false);

    const handleDropdown = () => {
        setDropped(prev => !prev);
    }

    return (
        <View style={styles.wrapper}>
            <Pressable onPress={handleDropdown}>
                <Feather name="bell" size={26} color="white" style={styles.bellIcon} />
            </Pressable>

            {isDropped && (
                <View style={styles.dropdown}>
                    <Text style={styles.title}>Notificaciones</Text>
                    <Text style={styles.notification}>Ramón Cruz aceptó tu turno.</Text>
                    <Text style={styles.notification}>Joaquín Villalba canceló tu solicitud.</Text>
                    <Text style={styles.notification}>Nahuel Silva canceló tu solicitud.</Text>
                </View>
            )}
        </View>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative', 
        zIndex: 999, 
    },
    bellIcon: {
        marginLeft: 10,
    },
    dropdown: {
        position: 'absolute',
        top: 30,
        right: 0,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        width: 240,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        zIndex: 1000,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 20,
        textAlign: 'center'
    },
    notification: {
        fontSize: 14,
        marginBottom: 4,
        borderBottomWidth: 1,  
        borderBottomColor: '#e0e0e0',  
        paddingBottom: 4
    },
});
