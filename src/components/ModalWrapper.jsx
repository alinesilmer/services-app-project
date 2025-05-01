import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Colors } from '../constants/Colors';

const ModalWrapper = ({
  visible,
  title,
  children,
  onCancel,
  onSubmit,
  cancelLabel = 'Cancelar',
  submitLabel = 'Guardar',
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          <View style={styles.content}>{children}</View>
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.submit]} onPress={onSubmit}>
              <Text style={styles.submitText}>{submitLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalWrapper;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: wp(5),
  },
  container: {
    backgroundColor: 'white',
    borderRadius: wp(3),
    maxHeight: '90%',
    padding: wp(4),
  },
  title: {
    fontSize: hp(2.3),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  content: {
    marginBottom: hp(2),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    marginLeft: wp(2),
  },
  cancel: {
    backgroundColor: Colors.inputGray,
  },
  submit: {
    backgroundColor: Colors.blueColor,
  },
  cancelText: {
    color: "black",
    fontWeight: '500',
  },
  submitText: {
    color: 'white',
    fontWeight: '500',
  },
});