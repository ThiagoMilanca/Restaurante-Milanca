"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.getUserId = exports.getAllUsers = void 0;
const data_source_1 = require("../config/data-source");
const usersServices_1 = require("../services/usersServices");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersServices_1.getAllUsersService)();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los usuarios",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = yield (0, usersServices_1.getUserByIdService)(Number(id));
        res.status(200).json(userId);
    }
    catch (error) {
        res.status(404).json({ message: "message" });
    }
});
exports.getUserId = getUserId;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            nDni: req.body.nDni,
        };
        const credentialsData = {
            username: req.body.username,
            password: req.body.password,
        };
        const newUser = yield (0, usersServices_1.createUserService)(userData, credentialsData);
        const user = yield data_source_1.UserModel.findOne({ where: { id: newUser.user.id } });
        if (user) {
            user.credential = newUser.user.credential;
            yield data_source_1.UserModel.save(user);
        }
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "error al crear" });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }
    try {
        const user = yield data_source_1.UserModel.findOne({
            where: { credential: { username } },
            relations: ["credential"]
        });
        if (!user || !user.credential) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        if (password !== user.credential.password) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = Math.random().toString(36).substring(2);
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        return res.status(200).json({ token, user: userData });
    }
    catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.login = login;
