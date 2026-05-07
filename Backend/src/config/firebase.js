const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

    // 🔥 FIX CLAVE
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

} else {
    serviceAccount = require("../../firebase-key.json");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;



