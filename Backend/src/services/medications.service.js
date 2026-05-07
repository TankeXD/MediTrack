const db = require("../config/firebase");

// GET ALL
exports.getAll = async (userId) => {
    const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("medications")
        .get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// GET BY ID
exports.getById = async (userId, id) => {
    const doc = await db
        .collection("users")
        .doc(userId)
        .collection("medications")
        .doc(id)
        .get();

    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
};

// CREATE
exports.create = async (userId, data) => {
    const docRef = await db
        .collection("users")
        .doc(userId)
        .collection("medications")
        .add(data);

    return { id: docRef.id, ...data };
};

// UPDATE
exports.update = async (userId, id, data) => {
    const docRef = db
        .collection("users")
        .doc(userId)
        .collection("medications")
        .doc(id);

    await docRef.update(data);

    const updated = await docRef.get();

    return { id: updated.id, ...updated.data() };
};

// DELETE
exports.remove = async (userId, id) => {
    await db
        .collection("users")
        .doc(userId)
        .collection("medications")
        .doc(id)
        .delete();
};
//hace que cree, reciba y actualice los datos de la base de datos