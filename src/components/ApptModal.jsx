import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const ApptModal = ({ visible, onClose, appt, onAccept, onCancel }) => {
  if (!appt) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
			onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Detalle del Turno</Text>
          <Text>Día: {appt.day}</Text>
          <Text>Hora: {appt.hour} hs</Text>
          <Text>Estado: {appt.status}</Text>
					{appt.clientDetails && (
						<Text>Cliente: {appt.clientDetails}</Text>
					)}
					{appt.apptDetails && (
						<Text>Servicio: {appt.apptDetails}</Text>
					)}

          {appt.status === 'PENDIENTE' ? (
            <View style={styles.buttonGroup}>
							<TouchableOpacity style={styles.cancel} onPress={onCancel}>
                <Text style={styles.buttonText}>Rechazar Turno</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accept} onPress={onAccept}>
                <Text style={styles.buttonText}>Aceptar Turno</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.close} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  accept: {
    backgroundColor: '#198754',
    padding: 10,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 8,
  },
  close: {
    backgroundColor: Colors.textColor,
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ApptModal;
