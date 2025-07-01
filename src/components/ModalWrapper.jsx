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

import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

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
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
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
    alignItems: "center"
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',

  },
  container: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    maxHeight: Metrics.screenM,
    padding: Metrics.marginM,
  },
  title: {
    fontSize: Metrics.fontL,
    fontWeight: 'bold',
    marginBottom: Metrics.marginS,
  },
  content: {
    paddingBottom: Metrics.marginXS,
    
  },
  scrollContent: {
    paddingBottom: Metrics.marginM,
  },
  actions: {
    flexDirection: 'row',
    marginTop: Metrics.marginM,
    alignItems: 'center'
      
  },
  btn: {
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginXL,
    borderRadius: Metrics.radiusS,
    marginRight: Metrics.marginM,
    marginLeft: Metrics.marginM

  },
  cancel: {
    backgroundColor: Colors.inputGray,
  },
  submit: {
    backgroundColor: Colors.blueColor,
  },
  cancelText: {
    color: Colors.textColor,
    fontWeight: "bold",
  },
  submitText: {
    color: Colors.whiteColor,
    fontWeight: "bold",
  },
});