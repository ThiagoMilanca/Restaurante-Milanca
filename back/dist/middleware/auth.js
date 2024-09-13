"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => {
    const { token } = req.headers;
    if (token === "autenticado")
        next();
    else
        res.status(400).json({ message: "Error, falta autenticacion" });
};
exports.default = auth;
