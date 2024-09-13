"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialService = void 0;
let credentials = [];
let credentialId = 1;
class CredentialService {
    createCredential(credentialData) {
        const newCredential = {
            id: credentialId,
            username: credentialData.username,
            password: credentialData.password
        };
        credentials.push(newCredential);
        credentialId++;
        return newCredential.id;
    }
    validateCredentials(username, password) {
        const credential = credentials.find(cred => cred.username === username && cred.password === password);
        return credential ? credential.id : null;
    }
}
exports.CredentialService = CredentialService;
