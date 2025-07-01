import { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile, getCompleteUserData } from '../utils/storage';

export const useProfile = () => {
  const [data, setData] = useState({
    fullName: 'Mirta Gaona',
    email: 'usuario@example.com',
    province: 'Chaco',
    department: 'Resistencia',
    address: 'Av. Sarmiento 1249',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let profileData = await getCompleteUserData();
        if (!profileData || !profileData.fullName) {
          const userData = await getUserProfile();

          profileData = {
            fullName: userData.fullName || 'Usuario',
            email: userData.email || '',
            province: userData.province || '',
            department: userData.department || '',
            address: userData.address || '',
          };
        } else {
        // Si hay datos completos, formatearlos correctamente
        profileData = {
          fullName: profileData.fullName || 'Usuario',
          email: profileData.email || '',
          province: profileData.province || '',
          department: profileData.department || '',
          address: profileData.address || '',
        };
      }
      
      setData(profileData);
      setFormData(profileData);

      } catch (error) {
        console.error('Error loading profile:', error);
        // En caso de error, mantener valores por defecto
        const defaultData = {
          fullName: 'Usuario',
          email: '',
          province: '',
          department: '',
          address: '',
        };
        setData(defaultData);
        setFormData(defaultData);
      }
    };

    loadProfile();
  }, []);

  const openModal = () => {
    setFormData(data);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setFormData(data); 
  };

  const saveForm = async () => {
    try {
      // Guardar el perfil con la estructura correcta
      const profileToSave = {
        avatar: 'https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg',
        fullName: formData.fullName,
        email: formData.email,
        province: formData.province,
        department: formData.department,
        address: formData.address,
        userType: 'client', // Asegurar que tenga un tipo de usuario
      };
      
      await saveUserProfile(profileToSave);
      
      setData(formData);
      setIsModalVisible(false);
      
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    data,
    formData,
    isModalVisible,
    openModal,
    closeModal,
    saveForm,
    updateFormData
  };
};