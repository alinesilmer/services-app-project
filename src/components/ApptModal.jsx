import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

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
          <Text style={styles.textStyle}>Día: {appt.day}</Text>
          <Text style={styles.textStyle}>Hora: {appt.hour} hs</Text>
          <Text style={styles.textStyle}>Estado: {appt.status}</Text>
					{appt.clientDetails && (
						<Text style={styles.textStyle}>Cliente: {appt.clientDetails}</Text>
					)}
					{appt.apptDetails && (
						<Text style={styles.textStyle}>Servicio: {appt.apptDetails}</Text>
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
    margin: Metrics.marginM,
    backgroundColor: Colors.whiteColor,
    padding: Metrics.marginXL,
    borderRadius: Metrics.radiusS,
    elevation: 5,
  },
  title: {
    fontSize: Metrics.fontL,
    fontWeight: 'bold',
    marginBottom: Metrics.marginM,
  },
  textStyle: {
    fontSize: Metrics.fontS,
    paddingLeft: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.marginM,
  },
  accept: {
    backgroundColor: Colors.orangeColor,
    padding: Metrics.marginM,
    borderRadius: Metrics.radiusS,
  },
  cancel: {
    backgroundColor: Colors.textColor,
    padding: Metrics.marginM,
    borderRadius: Metrics.radiusS,
  },
  close: {
    backgroundColor: Colors.textColor,
    padding: Metrics.marginM,
    marginTop: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Metrics.fontXS,
    color: Colors.whiteColor,
    fontWeight: 'bold',
  },
});

export default ApptModal;
