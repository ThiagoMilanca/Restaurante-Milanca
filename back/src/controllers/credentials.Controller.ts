import { Request, Response } from 'express';
import { CredentialService } from '../services/credentials.Services';

const credentialService = new CredentialService();

export class CredentialController {
    static createCredential(req: Request, res: Response): void {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username y password son obligatorios' });
            return;
        }

        const newCredentialId = credentialService.createCredential({ username, password });
        res.status(201).json({ id: newCredentialId });
    }

    static validateCredentials(req: Request, res: Response): void {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username y password son obligatorios' });
            return;
        }

        const credentialId = credentialService.validateCredentials(username, password);
        if (credentialId !== null) {
            res.status(200).json({ id: credentialId });
        } else {
            res.status(401).json({ error: 'Credencial invalida' });
        }
    }
}
