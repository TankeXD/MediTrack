"# ⚙️ MediTrack Backend

API REST para la gestión de medicamentos utilizada por la app Android y la aplicación web (PWA).

---

# 🚀 Tecnologías

* Node.js
* Express.js
* Firebase Admin SDK
* Firestore Database

---

# 📁 Estructura

```id="k2j3aa"
src/
├── config/        # Configuración Firebase
├── controllers/   # Lógica de controladores
├── services/      # Lógica de negocio
├── routes/        # Rutas API
├── middlewares/   # Auth, logger, etc.
└── app.js
server.js
```

---

# ▶️ Instalación

```bash id="4p91mn"
npm install
```

---

# ▶️ Ejecutar en local

```bash id="92kslq"
npm run dev
```

o

```bash id="q9d1aa"
node server.js
```

---

# 🌐 Variables de entorno

Crear archivo `.env`:

```env id="w91lso"
PORT=3000
FIREBASE_KEY={JSON_DE_TU_SERVICE_ACCOUNT}
```

⚠️ Alternativa local:

* Puedes usar `firebase-key.json` en desarrollo

---

# 🔐 Autenticación

Se utiliza Firebase Auth.

Las rutas protegidas requieren:

```id="f9s2ls"
Authorization: Bearer <token>
```

---

# 🔗 Endpoints

## 📥 Obtener todos

```http id="2lsks9"
GET /api/medications
```

## 📥 Obtener por ID

```http id="s8s2ls"
GET /api/medications/:id
```

## 📤 Crear

```http id="0s9sl2"
POST /api/medications
```

Body:

```json id="29slso"
{
  "nombre": "Ibuprofeno",
  "dosis": "400mg"
}
```

## 🔄 Actualizar

```http id="s9sll2"
PUT /api/medications/:id
```

## 🗑 Eliminar

```http id="92ls9s"
DELETE /api/medications/:id
```

---

# ☁️ Deploy

Recomendado usar Railway.

Pasos:

1. Subir repositorio
2. Configurar variables de entorno
3. Ejecutar automáticamente

---

# 🧪 Pruebas

Se utilizaron:

* Postman
* Pruebas de carga (10k+ requests)

---

# 📊 Rendimiento

* Respuestas JSON ligeras
* Manejo de múltiples peticiones
* API estable bajo carga

---

# ⚠️ Notas

* Asegúrate de enviar token en rutas protegidas
* Verificar conexión a Firebase

---

# 👨‍💻 Autor

Daniel González
"  
