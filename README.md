# 🧖‍♀️ Services App

Aplicación móvil desarrollada con **React Native + Expo** para gestionar turnos entre clientes y profesionales de servicios (como belleza, spa, salud y otros). Permite reservar, visualizar, calificar y administrar turnos de forma simple y moderna.

---

## 🚀 Características principales

- ✅ 📅 Reserva de turnos con calendario y selección de horarios.
- ⏱ 👩‍💼 Navegación por perfiles de profesionales.
- ✅ 💬 Sistema de comentarios y valoraciones.
- ✅ 📢 Usuarios básicos y premium.
- ✅ 🎥 Animaciones Lottie para feedback visual.
- ✅ 📲 Interfaz responsive y moderna.

---

## 📁 Estructura del proyecto

```
src/
├── app/               # Navegación y pantallas
│   ├── auth/          # Login, registro y recuperación
│   └── tabs/          # Vistas principales por rol (cliente/profesional)
├── assets/            # Imágenes, videos y animaciones
│   ├── ads/
│   ├── animations/
│   └── images/
├── components/        # Componentes reutilizables
├── constants/         # Colores y fuentes
├── data/              # Datos mock para pruebas
├── hooks/             # Custom Hooks
└── utils/             # Funciones utilitarias
```

---

## 📦 Dependencias clave

```
react-native
expo
expo-router                       # Enrutamiento tipo Next.js para apps móviles
react-native-calendars            # Calendario interactivo
lottie-react-native               # Animaciones Lottie
react-native-responsive-screen    # Diseño responsive
@expo/vector-icons                # Íconos vectoriales
```

---

## 🧪 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/services-app.git
cd services-app
```

### 2. Instalar las dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Ejecutar la aplicación

```bash
npx expo start
```

Escaneá el código QR con la app de **Expo Go** o abrí el proyecto en un emulador Android/iOS.