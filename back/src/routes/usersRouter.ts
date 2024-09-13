import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserId,
  login,
} from "../controllers/userController";

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", getUserId);

usersRouter.post("/register", createUser);

usersRouter.post("/login", login);

export default usersRouter;