import { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile, getCompleteUserData } from '../utils/storage';

export function useProfile() {
  // Datos permanentes
  const [data, setData] = useState({
    fullName: 'Martin Gonzalez',
    email: 'profesional@example.com',
    province: 'Chaco',
    department: 'Resistencia',
    address: 'Av Sarmiento 1249',
    availability: 'Lunes a Viernes de 9 a 14hs',
  });

  // Estado del modal y del formulario interno
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
      const loadProfile = async () => {
        try {
          let profileData = await getCompleteUserData();
          if (!profileData || !profileData.fullName) {
            const userData = await getUserProfile();
  
            profileData = {
              fullName: userData.fullName || 'Profesional',
              email: userData.email || '',
              province: userData.province || '',
              department: userData.department || '',
              address: userData.address || '',
              availability: userData.availability || '',
            };
          } else {
          // Si hay datos completos, formatearlos correctamente
          profileData = {
            fullName: profileData.fullName || 'Profesional',
            email: profileData.email || '',
            province: profileData.province || '',
            department: profileData.department || '',
            address: profileData.address || '',
            availability: profileData.availability || '',
          };
        }
        
        setData(profileData);
        setFormData(profileData);
  
        } catch (error) {
          console.error('Error loading profile:', error);
          // En caso de error, mantener valores por defecto
          const defaultData = {
            fullName: 'Profesional',
            email: '',
            province: '',
            department: '',
            address: '',
            availability: '',
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
        avatar: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
        fullName: formData.fullName,
        email: formData.email,
        province: formData.province,
        department: formData.department,
        address: formData.address,
        userType: 'professional', // Asegurar que tenga un tipo de usuario
      };
      
      await saveUserProfile(profileToSave);
      
      setData(formData);
      setIsModalVisible(false);
      
      console.log('Profile saved successfully:', profileToSave);
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
    updateFormData,
  };
}
