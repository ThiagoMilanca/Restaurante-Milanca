import CredentialRepository from "../repositories/CredentialRepository";
import UserRepository from "../repositories/UserRepository";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

export const getAllUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({
    relations: {
      appointments: true,
    },
  });
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserRepository.findOne({ where: {id}, relations: ["appointments"] });
   return user;
};

export const createUserService = async (
  userData: Partial<User>,
  credentialsData: Partial<Credential>
) => {
  const newCredential = CredentialRepository.create(credentialsData);
  await CredentialRepository.save(newCredential);

  const user = UserRepository.create({
    ...userData,
    credential: newCredential,
  });
  const results = await UserRepository.save(user);

  return { user: results, credentialId: newCredential.id };
};
