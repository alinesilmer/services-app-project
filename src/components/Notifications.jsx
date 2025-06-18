import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

const Notifications = () => {
  const [isDropped, setDropped] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const appointments = [
    {
      id: "1",
      professionalName: "Martin Gonzalez",
      profession: "Limpieza",
      date: new Date("2024-08-17"),
      time: "15:00",
    },
    {
      id: "2",
      professionalName: "Ana García",
      profession: "Electricista",
      date: new Date("2024-08-20"),
      time: "12:00",
    },
  ];

  useEffect(() => {
    const generated = appointments.map((b, index) => ({
      id: index + 1,
      read: false,
      message: `Tu turno con ${b.professionalName} (${b.profession}) fue confirmado para el ${b.date.toLocaleDateString()} a las ${b.time}.`,
    }));
    setNotifications(generated);
  }, []);

  const handleDropdown = () => {
    setDropped(prev => !prev);

    if (!isDropped) {
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handleDropdown}>
        <Feather name="bell" size={26} color="white" style={styles.bellIcon} />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </Pressable>

      {isDropped && (
        <View style={styles.dropdown}>
          <Text style={styles.title}>Notificaciones</Text>
          {notifications.length === 0 ? (
            <Text style={styles.notification}>No hay notificaciones nuevas.</Text>
          ) : (
            notifications.map(n => (
              <Text key={n.id} style={styles.notification}>
                {n.message}
              </Text>
            ))
          )}
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  wrapper: { position: 'relative', zIndex: 999 },
  bellIcon: { marginLeft: wp(2.5) },
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
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
