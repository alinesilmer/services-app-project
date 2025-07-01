
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  SafeAreaView,
  RefreshControl,
} from "react-native"
import { useState, useCallback, useEffect } from "react"
import { router, useFocusEffect } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { Metrics } from "../../../constants/Metrics"
import { Feather } from "@expo/vector-icons"

import AdsImage from "../../../components/AdsImage"
import NavBar from "../../../components/NavBar"
import AnimationFeedback from "../../../components/AnimationFeedback"
import ModifyAppointmentModal from "../../../components/ModifyAppointmentModal"
import mockAppointments from "../../../data/mockAppointments"
import BackButton from "../../../components/BackButton"
import { usePremium } from "../../../hooks/usePremium"

const MyAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [currentAppointments, setCurrentAppointments] = useState([])
  const [showDeleteAnimation, setShowDeleteAnimation] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState(null)

  const { premium } = usePremium()

  const loadAppointments = useCallback(() => {
    setCurrentAppointments([...mockAppointments])
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadAppointments()
    }, [loadAppointments]),
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadAppointments()
    setTimeout(() => setRefreshing(false), 1000)
  }, [loadAppointments])

  const formatDate = (date) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const appointmentDate = new Date(date)
    return `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} de ${months[appointmentDate.getMonth()]}`
  }

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment)
    setShowModal(true)
  }

  const handleCancelAppointment = (appointmentId) => {
    setAppointmentToDelete(appointmentId)
    setShowDeleteAnimation(true)

    setTimeout(() => {
      const index = mockAppointments.findIndex((apt) => apt.id === appointmentId)
      if (index > -1) {
        mockAppointments.splice(index, 1)
      }
      setCurrentAppointments([...mockAppointments])
      setShowModal(false)
      setShowDeleteAnimation(false)
      setAppointmentToDelete(null)
    }, 1500)
  }

  const handleRequestChange = () => {
    setShowModal(false)
    setTimeout(() => {
      setShowModifyModal(true)
    }, 100)
  }

      const userIsPremium =
        (premium.isPremium || premium.isPremiumProf) &&
        ["active", "trial"].includes(premium.premiumStatus)


  const handleSaveModifiedAppointment = (updatedAppointment) => {
    const index = mockAppointments.findIndex((apt) => apt.id === updatedAppointment.id)
    if (index > -1) {
      mockAppointments[index] = updatedAppointment
      setCurrentAppointments([...mockAppointments])
    }
    setShowModifyModal(false)
    setShowModal(false)
    setSelectedAppointment(null)
  }

  const handleCloseModifyModal = () => {
    setShowModifyModal(false)
    setSelectedAppointment(null)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content" />
      <View style={styles.header}>
        <BackButton />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.usernameText}>Usuario</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>MIS TURNOS</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {currentAppointments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Feather name="x" size={Metrics.iconXLarge} color="#ccc" />
              <Text style={styles.emptyText}>No tienes turnos programados</Text>
              <Text style={styles.emptySubtext}>Agenda tu primera cita con un profesional</Text>
            </View>
          ) : (
            currentAppointments.map((appointment) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={appointment.id}
                style={[styles.appointmentCard, appointment.isNew && styles.newAppointmentCard]}
                onPress={() => handleAppointmentPress(appointment)}
              >
                {appointment.isNew && <View style={styles.newIndicator} />}
                <View style={styles.appointmentHeader}>
                  <Feather name="calendar" size={Metrics.iconSmall} color={Colors.blueColor} />
                  <Text style={styles.appointmentTitle}>
                    {appointment.profession?.toUpperCase()}
                    {appointment.isNew && <Text style={styles.newText}> (Nuevo)</Text>}
                  </Text>
                </View>

                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Profesional:</Text> {appointment.professionalName}
                  </Text>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Fecha:</Text> {formatDate(appointment.date)}
                  </Text>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Hora:</Text> {appointment.time} h
                  </Text>
                  <Text style={styles.appointmentDetailText}>
                    <Text style={styles.detailLabel}>Ubicación:</Text> {appointment.location}
                  </Text>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Estado:</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{appointment.estado}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}

          <View style={styles.adContainer}>
            <AdsImage onPress isPremium={userIsPremium}/>
          </View>
        </ScrollView>
      </View>

      <Modal visible={showModal} transparent={true} animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedAppointment.profession?.toUpperCase()}
                    {selectedAppointment.isNew && <Text style={styles.newText}> (Nuevo)</Text>}
                  </Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => setShowModal(false)}>
                    <Feather name="x" size={Metrics.iconSmall} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.modalDetailRow}>
                    <Feather name="user" size={Metrics.iconSmall} color={Colors.blueColor} />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Profesional:</Text> {selectedAppointment.professionalName}
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <Feather name="calendar" size={Metrics.iconSmall} color={Colors.blueColor} />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Fecha:</Text> {formatDate(selectedAppointment.date)}
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <Feather name="clock" size={Metrics.iconSmall} color={Colors.blueColor} />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Hora:</Text> {selectedAppointment.time} h
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <Feather name="map-pin" size={Metrics.iconSmall} color={Colors.blueColor} />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Ubicación:</Text> {selectedAppointment.location}
                    </Text>
                  </View>

                  <View style={styles.modalDetailRow}>
                    <Feather name="check-circle" size={Metrics.iconSmall} color={Colors.orangeColor} />
                    <Text style={styles.modalDetailText}>
                      <Text style={styles.modalDetailLabel}>Estado:</Text> {selectedAppointment.estado}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                  activeOpacity={0.8}
                    style={styles.cancelButton}
                    onPress={() => handleCancelAppointment(selectedAppointment.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar Turno</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} style={styles.changeButton} onPress={handleRequestChange}>
                    <Text style={styles.changeButtonText}>Modificar Turno</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <ModifyAppointmentModal
        visible={showModifyModal}
        appointment={selectedAppointment}
        onClose={handleCloseModifyModal}
        onSave={handleSaveModifiedAppointment}
      />

      <Modal visible={showDeleteAnimation} transparent={true} animationType="fade">
        <View style={styles.animationOverlay}>
          <View style={styles.animationContainer}>
            <AnimationFeedback type="delete" />
            <Text style={styles.deleteTitle}>Turno Cancelado</Text>
          </View>
        </View>
      </Modal>

      <NavBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Metrics.marginS,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: Metrics.marginS
  },
  welcomeContainer: {
    alignItems: "center",
    flex: 1,
  },
  welcomeText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontM,
  },
  usernameText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontM,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.dark.tint,
    paddingTop: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  title: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: Metrics.marginS,
    color: Colors.orangeColor,
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Metrics.marginS,
  },
  emptyText: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.subtextColor,
    marginTop: Metrics.marginS,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: Metrics.fontS,
    color: Colors.subtextColor,
    marginTop: Metrics.marginS,
    textAlign: "center",
  },
  appointmentCard: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginM,
    marginBottom: Metrics.marginM,
    elevation: 2,
    shadowColor: Colors.textColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS,
    position: "relative",
  },
  newAppointmentCard: {
    backgroundColor: "#E8F5E8",
    borderLeftWidth: Metrics.marginXS,
    borderLeftColor: "#4CAF50",
  },
  newIndicator: {
    position: "absolute",
    top: Metrics.safeArea,
    right: Metrics.marginS,
    width: Metrics.marginS,
    height: Metrics.marginS,
    borderRadius: Metrics.radiusM,
    backgroundColor: Colors.orangeColor,
  },
  appointmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.marginM,
  },
  appointmentTitle: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    color: Metrics.textColor,
    marginLeft: 10,
  },
  newText: {
    color: Colors.orangeColor,
    fontSize: Metrics.fontM
  },
  appointmentDetails: {
    gap: Metrics.marginS,
  },
  appointmentDetailText: {
    fontSize: Metrics.fontS,
    color: Colors.subtextColor,
  },
  detailLabel: {
    fontWeight: "bold",
    color: Colors.textColor,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.marginS,
  },
  statusLabel: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.textColor,
    marginRight: Metrics.marginS,
  },
  statusBadge: {
    backgroundColor: Colors.orangeColor,
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    borderRadius: Metrics.radiusS
  },
  statusText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
  adContainer: {
    marginVertical: Metrics.marginS,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.marginM,
    padding: Metrics.marginM,
    margin: Metrics.marginM,
    width: Metrics.animationXL,
    maxHeight: Metrics.animationXXL,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Metrics.marginS,
    paddingBottom: Metrics.marginS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: Colors.inputGray,
  },
  modalTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.textColor,
  },
  modalBody: {
    marginBottom: Metrics.marginS,
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  modalDetailText: {
    fontSize: Metrics.fontS,
    color: Colors.subtextColor,
    marginLeft: Metrics.marginS,
    flex: 1,
  },
  modalDetailLabel: {
    fontWeight: "bold",
    color: Colors.textColor
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Metrics.marginS,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.textColor,
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
  changeButton: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    alignItems: "center",
  },
  changeButtonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
  animationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginL,
    alignItems: "center",
    minWidth: Metrics.animationXL,
  },
  deleteTitle: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.textColor,
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginL,
    textAlign: "center",
  },
})

export default MyAppointments
