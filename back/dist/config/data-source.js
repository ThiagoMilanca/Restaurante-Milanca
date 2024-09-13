"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModel = exports.AppointmentModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Appoiment_1 = require("../entities/Appoiment");
const Credential_1 = require("../entities/Credential");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: Number(envs_1.DB_PORT),
    username: envs_1.DB_USER,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: true,
    logging: ["error"],
    entities: [User_1.User, Appoiment_1.Appointment, Credential_1.Credential],
    subscribers: [],
    migrations: [],
    dropSchema: false,
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.AppointmentModel = exports.AppDataSource.getRepository(Appoiment_1.Appointment);
exports.CredentialsModel = exports.AppDataSource.getRepository(Credential_1.Credential);
