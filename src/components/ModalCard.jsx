import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

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
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  content: {
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: '#444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  closeText: {
    color: '#fff'
  }
});

export default ModalCard;