const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "No se proporciona un token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = await admin.auth().verifyIdToken(token);

        req.user = decoded;
        req.userId = decoded.uid;

        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(403).json({ error: "Token inválido" });
    }
};