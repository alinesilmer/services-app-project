import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    paddingTop: hp(3),
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: wp(5),
    borderRadius: wp(5),
    width: wp(80),
    alignItems: 'center',
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
    textAlign: 'center',
  },
  content: {
    padding: wp(3),
    marginBottom: hp(2),
  },
  closeButton: {
    backgroundColor: 'black',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    borderRadius: wp(3),
    marginTop: hp(2),
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ModalCard;
