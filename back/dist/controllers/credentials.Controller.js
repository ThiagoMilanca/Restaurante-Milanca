"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialController = void 0;
const credentials_Services_1 = require("../services/credentials.Services");
const credentialService = new credentials_Services_1.CredentialService();
class CredentialController {
    static createCredential(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username y password son obligatorios' });
            return;
        }
        const newCredentialId = credentialService.createCredential({ username, password });
        res.status(201).json({ id: newCredentialId });
    }
    static validateCredentials(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username y password son obligatorios' });
            return;
        }
        const credentialId = credentialService.validateCredentials(username, password);
        if (credentialId !== null) {
            res.status(200).json({ id: credentialId });
        }
        else {
            res.status(401).json({ error: 'Credencial invalida' });
        }
    }
}
exports.CredentialController = CredentialController;
