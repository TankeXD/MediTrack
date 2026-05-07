import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDDJeUAbYJLhSi_nXF_yaLjL_EuG46Hvck",
  authDomain: "meditrack-4f792.firebaseapp.com",
  projectId: "meditrack-4f792"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- REFERENCIAS AL DOM ---
const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// --- SISTEMA DE TOASTS ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutToast 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- AUTENTICACIÓN ---

// Si el usuario ya está logueado o se acaba de registrar con éxito, 
// lo redirigimos automáticamente a la página principal (index.html)
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

// Manejar Registro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  const btnText = document.getElementById('register-text');
  const btnLoader = document.getElementById('register-loader');
  
  // Mostrar loader
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      showToast('Cuenta creada exitosamente');
      // No necesitamos redirigir manualmente aquí, 
      // porque onAuthStateChanged se disparará al loguearse automáticamente
    })
    .catch((error) => {
      showToast(error.message, 'error');
      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
    });
});

// Manejar Registro con Google
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
