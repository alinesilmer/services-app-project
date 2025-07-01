import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

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
        <Feather name="bell" size={Metrics.iconSmall} color={Colors.whiteColor} style={styles.bellIcon} />
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
  wrapper: { 
    position: 'relative', 
    zIndex: 999 
  },
  bellIcon: { 
    marginLeft: Metrics.marginM,
  },
  dropdown: {
    position: 'absolute',
    top: Metrics.marginL,
    right: 0,
    backgroundColor: Colors.whiteColor,
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    width: Metrics.screenXS,
    shadowColor: Colors.textColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: Metrics.radiusS,
    elevation: 8,
    zIndex: 1000,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Metrics.fontM,
    marginBottom: Metrics.marginM,
    textAlign: 'center',
  },
  notification: {
    fontSize: Metrics.fontXS,
    marginBottom: Metrics.marginS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: '#e0e0e0',
    paddingBottom: Metrics.marginS,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.radiusS,
    paddingHorizontal: Metrics.marginXS,
    paddingVertical: Metrics.marginXS,
  },
  badgeText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontXS,
    fontWeight: 'bold',
  },
});
