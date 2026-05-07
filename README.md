"#  💊 MediTrack

Aplicación multiplataforma para la gestión de medicamentos, compuesta por:

* 📱 Aplicación móvil Android (APK)
* 🌐 Aplicación Web Progresiva (PWA)
* ⚙️ Backend API REST

El sistema está basado en una arquitectura cliente-servidor, donde múltiples clientes consumen una API centralizada desplegada en la nube.

---

# 🚀 Arquitectura del Sistema

```
Clientes (Android + Web PWA)
            ↓
        API REST (Node.js + Express)
            ↓
 Firebase (Auth + Base de datos)
```

✔ Ambos clientes (web y móvil) utilizan el mismo backend
✔ Datos centralizados
✔ Sistema escalable

---

# 🧱 Estructura del Proyecto

```
meditrack/
│
├── backend/        # API REST (Node.js + Express)
├── web/            # Aplicación Web (Firebase Hosting + PWA)
├── android/        # App Android (Android Studio)
└── README.md
```

---

# ⚙️ Tecnologías utilizadas

* Node.js
* Express.js
* Firebase (Auth + Firestore + Hosting)
* Android Studio
* Cliente HTTP (Retrofit / fetch / axios)
* Railway (deploy backend)

---

# 🔐 Funcionalidades

* Autenticación de usuarios (Firebase Auth)
* Gestión de medicamentos (CRUD)
* Consumo de API REST
* Aplicación multiplataforma
* Arquitectura centralizada

---

# ⚠️ CONFIGURACIÓN IMPORTANTE

Antes de ejecutar el proyecto, debes configurar la URL del backend.

---

## 🔗 URL del Backend

Debes reemplazar:

```plaintext
https://TU_BACKEND_URL/
```

Por la URL real de tu backend (ejemplo en Railway):

```plaintext
https://tu-backend.up.railway.app/
```

---

# 📦 Backend (API REST)

## 📁 Ubicación

```
/backend
```

---

## ▶️ Instalación

```bash
npm install
```

---

## ▶️ Ejecución local

```bash
npm run dev
```

---

## 🌐 Variables de entorno

Crear archivo `.env`:

```env
PORT=3000
FIREBASE_KEY={JSON_DE_TU_SERVICE_ACCOUNT}
```

---

## 🔗 Endpoints principales

```
GET    /api/medications
GET    /api/medications/:id
POST   /api/medications
PUT    /api/medications/:id
DELETE /api/medications/:id
```

---

## 🔐 Autenticación

Se utiliza Firebase Auth mediante token:

```
Authorization: Bearer <token>
```

---

## ☁️ Deploy

Backend recomendado en Railway.

---

# 🌐 Web App (PWA)

## 📁 Ubicación

```
/web
```

---

## ▶️ Instalación

```bash
npm install
```

---

## ▶️ Ejecutar en local

```bash
npm run dev
```

---

## 🔗 Configuración de API

Debes configurar la URL del backend en el archivo correspondiente:

```js
const BASE_URL = "https://TU_BACKEND_URL/";
```

---

## 🚀 Deploy

```bash
firebase deploy
```

---

## 🌍 Características

* Aplicación Web Progresiva (PWA)
* Instalable en dispositivos
* Funciona como app
* Consumo de API REST

---

# 📱 App Android

## 📁 Ubicación

```
/android
```

---

## ▶️ Abrir proyecto

Abrir en Android Studio.

---

## 🔗 Configuración de API

Editar archivo `ApiClient.kt`:

```kotlin
private const val BASE_URL = "https://TU_BACKEND_URL/"
```

---

## ▶️ Ejecutar

* Emulador
* Dispositivo físico

---

## 📦 Generar APK

```
Build → Build APK
```

---

# 🔗 Integración del sistema

```
App Android  ─┐
              ├──> API REST ───> Firebase
Web PWA      ─┘
```

✔ Backend centralizado
✔ Múltiples clientes
✔ Datos consistentes

---

# 🧪 Pruebas

Se realizaron pruebas utilizando:

* Postman (API testing)
* Pruebas de carga (10k – 20k requests)
* Lighthouse (rendimiento web)

---

# 📊 Rendimiento

* API optimizada con respuestas JSON ligeras
* Manejo de múltiples peticiones concurrentes
* Backend estable bajo carga

---

# 🔧 Variables importantes

Backend:

```
FIREBASE_KEY
PORT
```

Android:

```
BASE_URL
```

Web:

```
BASE_URL
```

---

# 🚧 Estado del proyecto

✅ Funcional
🚀 Escalable
🔧 Mejorable

---

# 📌 Mejoras futuras

* Notificaciones push
* Recordatorios de medicamentos
* Mejoras en UI/UX
* Panel administrativo

---

# 👨‍💻 Autor

Daniel González

---

# 📄 Licencia

Uso académico / educativo

---
"  
