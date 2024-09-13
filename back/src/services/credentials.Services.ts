import ICredential from "../interfaces/ICredential";
import ICredentialDto from "../dto/credentialDto";

let credentials: ICredential[] = [];
let credentialId = 1;

export class CredentialService {
  createCredential(credentialData: ICredentialDto): number {
    const newCredential: ICredential = {
      id: credentialId,
      username: credentialData.username,
      password: credentialData.password
    };
    credentials.push(newCredential);
    credentialId++;
    return newCredential.id;
  }
  validateCredentials(username: string, password: string): number | null {
    const credential = credentials.find(
      cred => cred.username === username && cred.password === password
    );
    return credential ? credential.id : null;
  }
}