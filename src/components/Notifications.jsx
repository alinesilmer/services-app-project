import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    marginLeft: wp(2.5),
  },
  dropdown: {
    position: 'absolute',
    top: hp(4),
    right: 0,
    backgroundColor: 'white',
    padding: wp(4),
    borderRadius: wp(3),
    width: wp(65),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 1000,
  },
  title: {
    fontWeight: 'bold',
    fontSize: hp(2.3),
    marginBottom: hp(2),
    textAlign: 'center',
  },
  notification: {
    fontSize: hp(1.7),
    marginBottom: hp(0.5),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: hp(0.5),
  },
});