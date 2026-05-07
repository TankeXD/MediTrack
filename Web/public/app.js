import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-performance.js";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDDJeUAbYJLhSi_nXF_yaLjL_EuG46Hvck",
  authDomain: "meditrack-4f792.firebaseapp.com",
  projectId: "meditrack-4f792"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const perf = getPerformance(app); // Requiere appId en firebaseConfig

// --- CONFIGURACIÓN DE LA API ---
const API_BASE_URL = "https://meditrack10-production.up.railway.app/api";

// --- REFERENCIAS AL DOM ---
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userEmailSpan = document.getElementById('user-email');
const btnLogout = document.getElementById('btn-logout');

const medGrid = document.getElementById('med-grid');
const dataLoader = document.getElementById('data-loader');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');

// Modales
const btnOpenAdd = document.getElementById('btn-open-add');
const medModal = document.getElementById('med-modal');
const medForm = document.getElementById('med-form');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const modalTitle = document.getElementById('modal-title');

const medIdInput = document.getElementById('med-id');
const medNombreInput = document.getElementById('med-nombre');
const medDosisInput = document.getElementById('med-dosis');

const deleteModal = document.getElementById('delete-modal');
const deleteMedName = document.getElementById('delete-med-name');
const deleteMedIdInput = document.getElementById('delete-med-id');
const btnCancelDelete = document.getElementById('btn-cancel-delete');
const btnConfirmDelete = document.getElementById('btn-confirm-delete');

// --- SISTEMA DE TOASTS ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);

  // Remover después de 3 segundos
  setTimeout(() => {
    toast.style.animation = 'fadeOutToast 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- ESTADO GLOBAL ---
let currentToken = null;
let allMedications = [];

// --- AUTENTICACIÓN ---
// Escuchar cambios de estado de autenticación
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Usuario logueado
    userEmailSpan.textContent = user.email;
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    
    // Obtener token para las peticiones API
    currentToken = await user.getIdToken();
    loadMedications();
  } else {
    // Usuario no logueado
    currentToken = null;
    appScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    
    // Limpiar grid
    medGrid.innerHTML = '';
  }
});

// Manejar Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  const btnText = document.getElementById('login-text');
  const btnLoader = document.getElementById('login-loader');
  
  // Mostrar loader
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      showToast('Inicio de sesión exitoso');
      loginForm.reset();
    })
    .catch((error) => {
      showToast(error.message, 'error');
    })
    .finally(() => {
      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
    });
});

// Manejar Login con Google
const btnGoogleLogin = document.getElementById('btn-google-login');
if (btnGoogleLogin) {
  btnGoogleLogin.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        showToast('Inicio de sesión con Google exitoso');
      })
      .catch((error) => {
        showToast(error.message, 'error');
      });
  });
}

// Manejar Logout
btnLogout.addEventListener('click', () => {
  signOut(auth).then(() => {
    showToast('Sesión cerrada');
  }).catch((error) => {
    showToast(error.message, 'error');
  });
});

// --- LÓGICA CRUD API ---

// Utility para hacer fetch con Token
async function fetchAPI(endpoint, method = 'GET', body = null) {
  if (!currentToken) throw new Error("No autenticado");

  const headers = {
    "Authorization": `Bearer ${currentToken}`,
    "Content-Type": "application/json"
  };

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  // Si la respuesta no es OK, arrojar el texto del error
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la petición API");
  }

  // Hay endpoints que pueden devolver 204 No Content (ej. DELETE sin body)
  if (response.status === 204) return null;

  return response.json();
}

// [READ] Cargar medicamentos
async function loadMedications() {
  dataLoader.classList.remove('hidden');
  medGrid.classList.add('hidden');
  emptyState.classList.add('hidden');

  try {
    const data = await fetchAPI('/medications');
    // Suponemos que el backend devuelve { data: [...] } o directamente el array [...]
    const medsArray = data.data || data;
    
    allMedications = medsArray;
    filterMedications();
  } catch (error) {
    showToast('Error cargando medicamentos: ' + error.message, 'error');
    dataLoader.classList.add('hidden');
  }
}

// Lógica de Búsqueda
function filterMedications() {
  const term = searchInput ? searchInput.value.toLowerCase() : '';
  const filtered = allMedications.filter(med => {
    const nombre = (med.nombre || '').toLowerCase();
    const dosis = (med.dosis || '').toLowerCase();
    return nombre.includes(term) || dosis.includes(term);
  });
  renderMedications(filtered);
}

if (searchInput) {
  searchInput.addEventListener('input', filterMedications);
}

// Renderizar en UI
function renderMedications(meds) {
  dataLoader.classList.add('hidden');
  medGrid.innerHTML = '';

  if (!meds || meds.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  medGrid.classList.remove('hidden');

  meds.forEach(med => {
    // Si el backend usa 'id' o '_id'
    const medId = med.id || med._id;
    
    const card = document.createElement('div');
    card.className = 'glass-panel med-card';
    card.innerHTML = `
      <div class="med-header">
        <div class="med-title">${med.nombre}</div>
        <div class="med-badge">Activo</div>
      </div>
      <div class="med-body">
        <p>Dosis: <span>${med.dosis}</span></p>
      </div>
      <div class="med-actions">
        <button class="btn btn-outline btn-small" onclick="openEditModal('${medId}', '${med.nombre}', '${med.dosis}')">Editar</button>
        <button class="btn btn-danger btn-small" onclick="openDeleteModal('${medId}', '${med.nombre}')">Eliminar</button>
      </div>
    `;
    medGrid.appendChild(card);
  });
}

// --- MODALES Y FORMULARIOS ---

// Abrir Modal Crear
btnOpenAdd.addEventListener('click', () => {
  medForm.reset();
  medIdInput.value = '';
  modalTitle.textContent = 'Nuevo Medicamento';
  medModal.classList.remove('hidden');
});

// Cerrar Modal Crear/Editar
function closeMedModal() {
  medModal.classList.add('hidden');
  medForm.reset();
}
btnCloseModal.addEventListener('click', closeMedModal);
btnCancelModal.addEventListener('click', closeMedModal);

// Exponer funciones globales para los botones de las cards
window.openEditModal = function(id, nombre, dosis) {
  medIdInput.value = id;
  medNombreInput.value = nombre;
  medDosisInput.value = dosis;
  modalTitle.textContent = 'Editar Medicamento';
  medModal.classList.remove('hidden');
};

window.openDeleteModal = function(id, nombre) {
  deleteMedIdInput.value = id;
  deleteMedName.textContent = nombre;
  deleteModal.classList.remove('hidden');
};

// Cerrar Modal Eliminar
function closeDeleteModal() {
  deleteModal.classList.add('hidden');
}
btnCancelDelete.addEventListener('click', closeDeleteModal);

// [CREATE / UPDATE] Guardar Medicamento
medForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = medIdInput.value;
  const payload = {
    nombre: medNombreInput.value,
    dosis: medDosisInput.value
  };

  const btnText = document.getElementById('save-text');
  const btnLoader = document.getElementById('save-loader');
  
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  try {
    if (id) {
      // Editar (PUT)
      await fetchAPI(`/medications/${id}`, 'PUT', payload);
      showToast('Medicamento actualizado');
    } else {
      // Crear (POST)
      await fetchAPI('/medications', 'POST', payload);
      showToast('Medicamento creado exitosamente');
    }
    
    closeMedModal();
    loadMedications();
  } catch (error) {
    showToast('Error guardando: ' + error.message, 'error');
  } finally {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
  }
});

// [DELETE] Confirmar Eliminación
btnConfirmDelete.addEventListener('click', async () => {
  const id = deleteMedIdInput.value;
  
  const btnText = document.getElementById('delete-text');
  const btnLoader = document.getElementById('delete-loader');
  
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  try {
    await fetchAPI(`/medications/${id}`, 'DELETE');
    showToast('Medicamento eliminado');
    closeDeleteModal();
    loadMedications();
  } catch (error) {
    showToast('Error eliminando: ' + error.message, 'error');
  } finally {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
  }
});
