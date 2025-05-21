import { useState, useEffect } from 'react';

export function useProfile() {
  // Datos permanentes
  const [data, setData] = useState({
    fullName: 'Martin Gonzalez',
    email: 'martingzz@gmail.com',
    province: 'Chaco',
    city: 'Resistencia',
    address: 'Av Sarmiento 1249',
    availability: 'Lunes a Viernes de 9 a 14hs',
  });

  // Estado del modal y del formulario interno
  const [isModalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(data);

  // Cada vez que cambien los datos “oficiales”, reseteamos el form
  useEffect(() => {
    setForm(data);
  }, [data]);

  function openModal() {
    setModalVisible(true);
  }
  function closeModal() {
    setModalVisible(false);
  }

  function handleFormChange(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function saveForm() {
    setData(form);
    closeModal();
  }

  return {
    data,
    form,
    isModalVisible,
    openModal,
    closeModal,
    handleFormChange,
    saveForm,
  };
}
