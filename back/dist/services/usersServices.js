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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserRepository_1.default.find({
        relations: {
            appointments: true,
        },
    });
    return users;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.findOne({ where: { id }, relations: ["appointments"] });
    return user;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (userData, credentialsData) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = CredentialRepository_1.default.create(credentialsData);
    yield CredentialRepository_1.default.save(newCredential);
    const user = UserRepository_1.default.create(Object.assign(Object.assign({}, userData), { credential: newCredential }));
    const results = yield UserRepository_1.default.save(user);
    return { user: results, credentialId: newCredential.id };
});
exports.createUserService = createUserService;
