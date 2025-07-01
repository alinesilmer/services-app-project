// ModalCard: modal dialog with overlay, title, content, and close button.
// Props:
// - visible: boolean to show modal.
// - onClose: callback to close modal.
// - title: modal title.
// - children: content inside modal.
//------------------------------------------------------------------//

import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const ModalCard = ({ visible, onClose, title, children }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.content}>{children}</View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Metrics.marginS,
  },
  modalContainer: {
    backgroundColor: Colors.whiteColor,
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    width: Metrics.animationXL,
    alignItems: 'center',
  },
  title: {
    fontSize: Metrics.fontM,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
    textAlign: 'center',
  },
  content: {
    padding: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  closeButton: {
    backgroundColor: 'black',
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ModalCard;
