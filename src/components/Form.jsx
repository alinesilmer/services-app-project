import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import SlideUpCard from './SlideUpCard';
import LongCard from './LongCard';
import ModalPersonalizado from './ModalPersonalizado';
import DatePicker from './DatePicker';  

const Form = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', correo: '', fecha: null });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomInput
        label="Nombre"
        placeholder="Ingrese su nombre"
        value={formData.nombre}
        onChangeText={text => handleChange('nombre', text)}
        required
      />
      <CustomInput
        label="Correo"
        placeholder="Ingrese su correo"
        value={formData.correo}
        onChangeText={text => handleChange('correo', text)}
        keyboardType="email-address"
        required
      />
     
      <DatePicker
        label="Fecha de Nacimiento"
        value={formData.fecha}
        onChange={(date) => handleChange('fecha', date)}
      />
      
      <CustomButton label="Enviar" onPress={() => setModalVisible(true)} />

      <SlideUpCard>
        <LongCard
          title="Título de Prueba"
          subtitle="Subtítulo"
          content="Este es un contenido de prueba dentro de una tarjeta larga."
        />
      </SlideUpCard>

      <ModalPersonalizado
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmación"
      >
        <LongCard
          title="Formulario Enviado"
          subtitle="Gracias por su respuesta"
          content={`Nombre: ${formData.nombre}\nCorreo: ${formData.correo}\nFecha: ${formData.fecha ? formData.fecha.toLocaleDateString() : 'No seleccionada'}`}
        />
      </ModalPersonalizado>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

export default Form;
