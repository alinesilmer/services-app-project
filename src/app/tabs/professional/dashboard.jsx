import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import ProfilePic from '../../../components/ProfilePic';
import DisplayField from '../../../components/DisplayField';
import IconButton from '../../../components/IconButton';
import ModalWrapper from '../../../components/ModalWrapper';
import { useProfile } from '../../../hooks/useProfile';
import CustomInput from '../../../components/CustomInput';
import { Colors } from '../../../constants/Colors';

export default function ProfileScreen() {
  const {
    data,
    form,
    isModalVisible,
    openModal,
    closeModal,
    handleFormChange,
    saveForm,
  } = useProfile();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <IconButton onPress={openModal} />
      </View>

   
      <ScrollView contentContainerStyle={styles.content}>
        <ProfilePic uri="https://i.pravatar.cc/300" size={120} />
        <Text style={styles.name}>{data.fullName}</Text>
        <View style={styles.fields}>
          <DisplayField label="Email" value={data.email} />
          <DisplayField label="Provincia" value={data.province} />
          <DisplayField label="Departamento" value={data.department} />
          <DisplayField label="Dirección" value={data.address} />
        </View>
      </ScrollView>

      <ModalWrapper
        visible={isModalVisible}
        title="Editar perfil"
        onCancel={closeModal}
        onSubmit={saveForm}
        cancelLabel="Cancelar"
        submitLabel="Guardar"
      >
        <CustomInput
          label="Nombre completo"
          value={form.fullName}
          onChangeText={text => handleFormChange('fullName', text)}
        />
        <CustomInput
          label="Email"
          value={form.email}
          onChangeText={text => handleFormChange('email', text)}
          keyboardType="email-address"
        />
        <CustomInput
          label="Provincia"
          value={form.province}
          onChangeText={text => handleFormChange('province', text)}
        />
        <CustomInput
          label="Departamento"
          value={form.department}
          onChangeText={text => handleFormChange('department', text)}
        />
        <CustomInput
          label="Dirección"
          value={form.address}
          onChangeText={text => handleFormChange('address', text)}
        />
      </ModalWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    color: Colors.dark,
  },
  fields: {
    width: '100%',
  },
});
