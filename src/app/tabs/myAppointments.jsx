"use client";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  Alert,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AdsImage from "../../components/AdsImage";
import NavBar from "../../components/NavBar";
import mockAppointments from "../../data/mockAppointments";

const MyAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentAppointments, setCurrentAppointments] = useState([]);

  // Función para cargar citas
  const loadAppointments = useCallback(() => {
    setCurrentAppointments([...mockAppointments]);
  }, []);

  // Cargar citas cuando la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAppointments();
    setTimeout(() => setRefreshing(false), 1000);
  }, [loadAppointments]);

  const formatDate = (date) => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const appointmentDate = new Date(date);
    return `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} de ${
      months[appointmentDate.getMonth()]
    }`;
  };

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    Alert.alert(
      "Cancelar Turno",
      "¿Estás seguro que deseas cancelar este turno?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => {
            // Eliminar del array local
            const index = mockAppointments.findIndex(
              (apt) => apt.id === appointmentId
            );
            if (index > -1) {
              mockAppointments.splice(index, 1);
            }
            setCurrentAppointments([...mockAppointments]);
            setShowModal(false);
            Alert.alert(
              "Turno cancelado",
              "El turno ha sido cancelado exitosamente"
            );
          },
        },
      ]
    );
  };

  const handleRequestChange = () => {
    Alert.alert(
      "Solicitar Cambio",
      "Esta funcionalidad estará disponible próximamente"
    );
  };

  const handleAdClick = () => {
    console.log("Anuncio en mis turnos clickeado!");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.usernameText}>Usuario</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>MIS TURNOS</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {currentAppointments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="event-busy" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No tienes turnos programados</Text>
              <Text style={styles.emptySubtext}>
                Agenda tu primera cita con un profesional
              </Text>
            </View>
          ) : (
            currentAppointments.map((appointment) => (
              <TouchableOpacity
              activeOpacity={0.8}
                key={appointment.id}
                style={[
                  styles.appointmentCard,
                  appointment.isNew && styles.newAppointmentCard,
                ]}
                onPress={() => handleAppointmentPress(appointment)}
              >
                {appointment.isNew && <View style={styles.newIndicator} />}
                <View style={styles.appointmentHeader}>
                  <MaterialIcons
                    name="event"
                    size={24}
                    color={Colors.blueColor}
                  />
                  <Text style={styles.appointmentTitle}>
                    {appointment.profession?.toUpperCase()}
                    {appointment.isNew && (
                      <Text style={styles.newText}> (Nuevo)</Text>
                    )}
                  </Text>
                </View>

                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Profesional:</Text>{" "}
                    {appointment.professionalName}
                  </Text>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Fecha:</Text>{" "}
                    {formatDate(appointment.date)}
                  </Text>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Hora:</Text>{" "}
                    {appointment.time} h
                  </Text>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Ubicación:</Text>{" "}
                    {appointment.location}
                  </Text>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Estado:</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>
                        {appointment.estado}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}

          {/* Anuncio */}
          <View style={styles.adContainer}>
            <AdsImage onPress={handleAdClick} />
          </View>
        </ScrollView>
      </View>

      {/* Modal de detalles */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedAppointment.profession?.toUpperCase()}
                    {selectedAppointment.isNew && (
                      <Text style={styles.newText}> (Nuevo)</Text>
                    )}
                  </Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <AntDesign name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.modalDetailRow}>
                    <MaterialIcons
                      name="person"
                      size={20}
                      color={Colors.blueColor}
                    />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Profesional:</Text>{" "}
                      {selectedAppointment.professionalName}
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <MaterialIcons
                      name="calendar-today"
                      size={20}
                      color={Colors.blueColor}
                    />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Fecha:</Text>{" "}
                      {formatDate(selectedAppointment.date)}
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <MaterialIcons
                      name="access-time"
                      size={20}
                      color={Colors.blueColor}
                    />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Hora:</Text>{" "}
                      {selectedAppointment.time} h
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <MaterialIcons
                      name="location-on"
                      size={20}
                      color={Colors.blueColor}
                    />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Ubicación:</Text>{" "}
                      {selectedAppointment.location}
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#28a745"
                    />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Estado:</Text>{" "}
                      {selectedAppointment.estado}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() =>
                      handleCancelAppointment(selectedAppointment.id)
                    }
                  >
                    <Text style={styles.cancelButtonText}>Cancelar Turno</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={handleRequestChange}
                  >
                    <Text style={styles.changeButtonText}>
                      Solicitar Cambio
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    alignItems: "center",
    flex: 1,
  },
  welcomeText: {
    color: "white",
    fontSize: wp("4%"),
  },
  usernameText: {
    color: "white",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("10%"),
  },
  emptyText: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#666",
    marginTop: 20,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: wp("3.5%"),
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
  appointmentCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: "relative",
  },
  newAppointmentCard: {
    backgroundColor: "#E8F5E8",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  newIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  appointmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  appointmentTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  newText: {
    color: "#4CAF50",
    fontSize: wp("3.5%"),
  },
  appointmentDetails: {
    gap: 8,
  },
  appointmentDetailText: {
    fontSize: wp("3.8%"),
    color: "#666",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  statusLabel: {
    fontSize: wp("3.8%"),
    fontWeight: "600",
    color: "#333",
    marginRight: 10,
  },
  statusBadge: {
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: wp("3%"),
    fontWeight: "600",
  },
  adContainer: {
    marginVertical: 20,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: wp("90%"),
    maxHeight: hp("80%"),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    color: "#333",
  },
  modalBody: {
    marginBottom: 30,
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  modalDetailText: {
    fontSize: wp("4%"),
    color: "#666",
    marginLeft: 15,
    flex: 1,
  },
  modalDetailLabel: {
    fontWeight: "600",
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: wp("3.8%"),
    fontWeight: "600",
  },
  changeButton: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  changeButtonText: {
    color: "white",
    fontSize: wp("3.8%"),
    fontWeight: "600",
  },
});

export default MyAppointments;
