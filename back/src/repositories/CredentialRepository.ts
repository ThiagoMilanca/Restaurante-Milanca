import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

const CredentialRepository = AppDataSource.getRepository(Credential);

export default CredentialRepository