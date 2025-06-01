//ModalWrapper: displays a modal overlay with a title, content, and action buttons.
// Props: visible, title, children, onCancel, onSubmit, cancelLabel, submitLabel
//Unlike ModalCard, this component was thought to be used for cancel/save actions, like profile config
//------------------------------------------------------------------//

import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard } from 'react-native';
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.container}>
              {!!title && <Text style={styles.title}>{title}</Text>}

              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.content}>{children}</View>
              </ScrollView>

              <View style={styles.actions}>
                <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
                  <Text style={styles.cancelText}>{cancelLabel}</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.submit]} onPress={onSubmit}>
                  <Text style={styles.submitText}>{submitLabel}</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: wp('5%'),
    maxHeight: hp('80%'),
    padding: wp('5%'),
  },
  title: {
    fontSize: hp(2.3),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  content: {
    paddingBottom: hp('1%'),
  },
  scrollContent: {
    paddingBottom: hp('2%'),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp('2%'),
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