import { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile, getCompleteUserData } from '../utils/storage';

export const useProfile = () => {
  const [data, setData] = useState({
    fullName: 'Usuario',
    email: '',
    province: '',
    department: '',
    address: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const completeUserData = await getCompleteUserData();
        if (completeUserData) {
          const profileData = {
            fullName: completeUserData.username || completeUserData.fullName || 'Usuario',
            email: completeUserData.email || '',
            province: completeUserData.province || '',
            department: completeUserData.department || '',
            address: completeUserData.address || '',
          };
          setData(profileData);
          setFormData(profileData);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
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
      await saveUserProfile(formData);
      
      setData(formData);
      setIsModalVisible(false);
      
      console.log('Profile saved successfully');
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