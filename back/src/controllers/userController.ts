import { UserModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { getAllUsersService, getUserByIdService, createUserService } from "../services/usersServices";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersService();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todos los usuarios",
    });
  }
};

export const getUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId: User | null = await getUserByIdService(Number(id));
    res.status(200).json(userId);
  } catch (error) {
    res.status(404).json({ message: "message" });
  }}

export const createUser = async (req: Request, res: Response) => {
  try {

    const userData: Partial<User> = {
      name: req.body.name,
      email: req.body.email,
      birthdate: req.body.birthdate,
      nDni: req.body.nDni,
    };

    const credentialsData: Partial<Credential> = {
      username: req.body.username,
      password: req.body.password,
    };

    const newUser = await createUserService(userData, credentialsData);

    const user = await UserModel.findOne({ where: { id: newUser.user.id } });

    if (user) {
      user.credential = newUser.user.credential;
      await UserModel.save(user);
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "error al crear" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
  }

  try {

    const user = await UserModel.findOne({
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
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};