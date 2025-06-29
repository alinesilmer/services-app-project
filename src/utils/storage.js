import AsyncStorage from "@react-native-async-storage/async-storage";

// MOCK USERS
export const MOCK_USERS = [
  {
    fullName: "Mirta Gaona",
    password: "123456",
    userType: "cliente",
    email: "usuario@example.com",
    birthdate: "1990-01-01",
    province: "Chaco",
    department: "Resistencia",
    address: "Av. Sarmiento 1249",
  },
  {
    id: 34,
    fullName: "Martin Gonzalez",
    password: "123456",
    userType: "professional",
    email: "profesional@example.com",
    birthdate: "1985-05-10",
    province: "Chaco",
    department: "Resistencia",
    address: "Av Sarmiento 1249",
    availability: "Lunes a Viernes de 9 a 14hs",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    descripcion: "Pulse el lápiz para agregar una descripción sobre usted.",
    profesion: "Belleza",
  },
];

// STORAGE KEYS
const STORAGE_KEYS = {
  USER_DATA: "user_data",
  IS_LOGGED_IN: "is_logged_in",
  REGISTERED_USERS: "registered_users",
  USER_PROFILE: "user_profile",
  USER_PREMIUM_PREFIX: "user_premium_",
};

const getUserPremiumKey = (userId) =>
  `${STORAGE_KEYS.USER_PREMIUM_PREFIX}${userId}`;

export const saveUserLogin = async (userData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true");
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify({ email: userData.email })
    );

    await saveUserProfile({
      id: userData.id || 0,
      fullName: userData.username || userData.fullName || "Usuario",
      email: userData.email,
      province: userData.province || "",
      department: userData.department || "",
      address: userData.address || "",
      userType: userData.userType,
      birthdate: userData.birthdate || "",
      avatar: userData.avatar || "",
      descripcion: userData.descripcion || "",
      profesion: userData.profesion || "",
    });

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
  } catch {
    return false;
  }
};

export const getUserData = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getUserProfile = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
export const saveUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PROFILE,
      JSON.stringify(profile)
    );
    return true;
  } catch {
    return false;
  }
};

export const getCompleteUserData = async () => ({
  ...(await getUserData()),
  ...(await getUserProfile()),
});

export const logoutUser = async () => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.IS_LOGGED_IN,
    STORAGE_KEYS.USER_DATA,
    STORAGE_KEYS.USER_PROFILE,
  ]);
  return true;
};

export const registerUser = async (user) => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    const all = raw ? JSON.parse(raw) : [];
    if (
      all.some((u) => u.username === user.username || u.email === user.email)
    ) {
      return { success: false, message: "Username or email exists" };
    }
    all.push(user);
    await AsyncStorage.setItem(
      STORAGE_KEYS.REGISTERED_USERS,
      JSON.stringify(all)
    );
    await saveUserLogin(user);
    return { success: true };
  } catch {
    return { success: false, message: "Error registering" };
  }
};

export const getUserType = async () => {
  try {
    const raw = await AsyncStorage.getItem("user_profile");
    const profile = raw ? JSON.parse(raw) : null;
    return profile?.userType || null;
  } catch {
    return null;
  }
};

export const checkLoginCredentials = async (email, password) => {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
  const all = raw ? JSON.parse(raw) : [];
  const user = [...all, ...MOCK_USERS].find(
    (u) => u.email === email && u.password === password
  );
  return user ? { success: true, user } : { success: false };
};

// ===== PREMIUM PERSISTENCE =====
export const saveUserPremiumData = async (userId, data) => {
  try {
    await AsyncStorage.setItem(getUserPremiumKey(userId), JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
};

export const getUserPremiumData = async (userId) => {
  try {
    const raw = await AsyncStorage.getItem(getUserPremiumKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isPremiumUser = async () => {
  try {
    const profile = await getUserProfile();
    if (!profile || profile.id === undefined) return false;

    const premiumData = await getUserPremiumData(profile.id);
    return !!premiumData;
  } catch {
    return false;
  }
};

export const clearUserPremiumData = async (userId) => {
  try {
    await AsyncStorage.removeItem(getUserPremiumKey(userId));
    return true;
  } catch {
    return false;
  }
};

// ===== MOCK CREDIT CARDS =====
const MOCK_CREDIT_CARDS = [
  { number: "1111111111111111", cvv: "123", expiry: "12/25", type: "visa" },
];
export const validateCreditCard = (card) => {
  const c = MOCK_CREDIT_CARDS.find(
    (c) => c.number === card.number.replace(/\s/g, "")
  );
  if (!c) return { success: false, message: "Tarjeta inválida" };
  if (card.cvv !== c.cvv) return { success: false, message: "CVV incorrecto" };
  if (card.expiry !== c.expiry)
    return { success: false, message: "Expiración inválida" };
  return { success: true, cardType: c.type };
};
