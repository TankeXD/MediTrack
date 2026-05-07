"## 🌐 MediTrack Web (PWA)

Aplicación Web Progresiva (PWA) para la gestión de medicamentos, conectada a la API REST del sistema MediTrack.

---

# 🚀 Tecnologías

* HTML / CSS / JavaScript
* Firebase Hosting
* Firebase Auth
* Fetch / Axios

---

# 📁 Estructura

```id="29sls0"
web/
├── index.html
├── css/
├── js/
│   ├── api.js
│   └── auth.js
├── manifest.json
├── service-worker.js
└── firebase.json
```

---

# ▶️ Instalación

```bash id="20sll2"
npm install
```

---

# ▶️ Ejecutar en local

```bash id="0sll2s"
npm run dev
```

o abrir directamente:

```id="sll2k9"
index.html
```

---

# 🔗 Configuración de API

⚠️ IMPORTANTE:

Debes configurar la URL del backend en el archivo correspondiente:

```js id="ssll29"
const BASE_URL = "https://TU_BACKEND_URL/";
```

Ejemplo:

```js id="ss2l9s"
const BASE_URL = "https://tu-backend.up.railway.app/";
```

---

# 🔐 Autenticación

Se utiliza Firebase Authentication:

* Login
* Registro
* Token JWT

---

# 🌍 Características

* Aplicación Web Progresiva (PWA)
* Instalable en dispositivos
* Funciona offline (según configuración)
* Consumo de API REST

---

# 🚀 Deploy

```bash id="sl29s0"
firebase deploy
```

---

# 📊 Rendimiento

Evaluado con Lighthouse:

* Buen tiempo de carga
* Buenas prácticas
* Optimización básica aplicada

---

# 🧪 Pruebas

* Navegador
* Dispositivos móviles
* Instalación como PWA

---

# ⚠️ Notas

* Debes configurar correctamente la URL del backend
* Firebase debe estar bien configurado

---

# 👨‍💻 Autor

Daniel González
"  
