import AsyncStorage from "@react-native-async-storage/async-storage";

//MOCKS
const MOCK_USERS = [
  {
    fullName: "Mirta Gaona",
    password: "123456",
    userType: "client",
    email: "usuario@example.com",
    birthdate: "1990-01-01",
    province: 'Chaco',
    department: 'Resistencia',
    address: 'Av. Sarmiento 1249',
  },
  {
    fullName: "Martin Gonzalez",
    password: "123456",
    userType: "professional",
    email: "profesional@example.com",
    birthdate: "1985-05-10",
    province: 'Chaco',
    department: 'Resistencia',
    address: 'Av Sarmiento 1249',
    availability: 'Lunes a Viernes de 9 a 14hs',
  },
];

// KEYS
const STORAGE_KEYS = {
  USER_DATA: "user_data",
  IS_LOGGED_IN: "is_logged_in",
  IS_PREMIUM: "is_premium", // Flujo sin publicidad para clientes
  IS_PREMIUM_PROF: "is_premium_prof", // Flujo con publicidad personalizada para profesionales
  REGISTERED_USERS: "registered_users",
  USER_PROFILE: "user_profile",
};

export const saveUserLogin = async (userData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true");
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify({ email: userData.email })
    );

    await saveUserProfile({
      fullName: userData.username || userData.fullName || 'Usuario',
      email: userData.email,
      province: userData.province || '',
      department: userData.department || '',
      address: userData.address || '',
      userType: userData.userType,
      birthdate: userData.birthdate || '',
    });

    console.log("User login saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving user login:", error);
    return false;
  }
};

export const isUserLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
    return value === "true";
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const getUserProfile = async () => {
  try {
    const profileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profileData ? JSON.parse(profileData) : null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

export const saveUserProfile = async (profileData) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PROFILE,
      JSON.stringify(profileData)
    );
    console.log("User profile saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return false;
  }
};

export const getCompleteUserData = async () => {
  try {
    const userData = await getUserData();
    const profileData = await getUserProfile();
    const isPremium = await isPremiumUser();

    return {
      ...userData,
      ...profileData,
      isPremium,
    };
  } catch (error) {
    console.error("Error getting complete user data:", error);
    return null;
  }
};

export const getUserType = async () => {
  try {
    const profileData = await getUserProfile();
    return profileData?.userType || null;
  } catch (error) {
    console.error("Error getting user type:", error);
    return null;
  }
};

export const saveUserType = async (type) => {
  await AsyncStorage.setItem("userType", type)
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    console.log("User logged out successfully");
    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    return false;
  }
};

export const registerUser = async (userData) => {
  try {
    const existingUsersJSON = await AsyncStorage.getItem(
      STORAGE_KEYS.REGISTERED_USERS
    );
    const existingUsers = existingUsersJSON
      ? JSON.parse(existingUsersJSON)
      : [];

    const usernameExists = existingUsers.some(
      (user) => user.username === userData.username
    );
    const emailExists = existingUsers.some(
      (user) => user.email === userData.email
    );

    if (usernameExists || emailExists) {
      return { success: false, message: "Username or email already exists" };
    }

    existingUsers.push(userData);
    await AsyncStorage.setItem(
      STORAGE_KEYS.REGISTERED_USERS,
      JSON.stringify(existingUsers)
    );

    await saveUserLogin(userData.email);

    await saveUserProfile({
      fullName: userData.username,
      email: userData.email,
      province: "",
      department: "",
      address: "",
      userType: userData.userType,
      birthdate: userData.birthdate,
    });

    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Error saving user data" };
  }
};

export const checkLoginCredentials = async (email, password) => {
  try {
    const existingUsersJSON = await AsyncStorage.getItem(
      STORAGE_KEYS.REGISTERED_USERS
    );

    const existingUsers = existingUsersJSON
      ? JSON.parse(existingUsersJSON)
      : [];

    const allUsers = [...existingUsers, ...MOCK_USERS];

    const user = allUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) return { success: false, user: null };
    return { success: true, user: user };
  } catch (error) {
    console.error("Error checking credentials:", error);
    return { success: false, user: null };
  }
};

export const setPremiumStatus = async (isPremium) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.IS_PREMIUM,
      isPremium ? "true" : "false"
    );
    console.log("Premium status updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating premium status:", error);
    return false;
  }
};

export const isPremiumUser = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_PREMIUM);
    return value === "true";
  } catch (error) {
    console.error("Error checking premium status:", error);
    return false;
  }
};

export const setPremiumProfStatus = async (isPremiumProf) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.IS_PREMIUM_PROF,
      isPremiumProf ? "true" : "false"
    );
    console.log("Professional premium status updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating professional premium status:", error);
    return false;
  }
};

export const isPremiumProf = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_PREMIUM_PROF);
    return value === "true";
  } catch (error) {
    console.error("Error checking professional premium status:", error);
    return false;
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All data cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};

const MOCK_CREDIT_CARDS = [
  {
    number: "1111111111111111",
    name: "VISA Test Card",
    cvv: "123",
    expiry: "12/25",
    type: "visa",
  },
  {
    number: "5555555555554444",
    name: "MasterCard Test Card",
    cvv: "456",
    expiry: "11/26",
    type: "mastercard",
  },
  {
    number: "378282246310005",
    name: "American Express Test Card",
    cvv: "1234",
    expiry: "10/27",
    type: "amex",
  },
];

export const validateCreditCard = (cardData) => {
  const { number, cvv, expiry, name } = cardData;

  const cleanNumber = number.replace(/\s/g, "");

  const validCard = MOCK_CREDIT_CARDS.find(
    (card) => card.number === cleanNumber
  );

  if (!validCard) {
    return {
      success: false,
      message: "Número de tarjeta inválido. Use una tarjeta de prueba.",
    };
  }

  if (cvv !== validCard.cvv) {
    return {
      success: false,
      message: "CVV incorrecto.",
    };
  }

  const formattedExpiry =
    expiry.length === 4
      ? `${expiry.substring(0, 2)}/${expiry.substring(2, 4)}`
      : expiry;
  if (formattedExpiry !== validCard.expiry) {
    return {
      success: false,
      message: "Fecha de expiración incorrecta.",
    };
  }

  if (!name || name.trim().length < 2) {
    return {
      success: false,
      message: "Nombre del titular requerido.",
    };
  }

  return {
    success: true,
    message: "Pago procesado exitosamente.",
    cardType: validCard.type,
  };
};

export const getMockCreditCards = () => {
  return MOCK_CREDIT_CARDS.map((card) => ({
    ...card,
    displayNumber: `**** **** **** ${card.number.slice(-4)}`,
  }));
};
