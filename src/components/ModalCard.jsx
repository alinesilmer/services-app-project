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
    alignItems: 'center',
    paddingTop: 30, 
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', 
  },
  content: {
    padding: 10,
    marginBottom: 20,
    textAlign: 'center', 
  },
  closeButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonPressed: {
    backgroundColor: 'orange', 
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', 
  }
});

export default ModalCard;