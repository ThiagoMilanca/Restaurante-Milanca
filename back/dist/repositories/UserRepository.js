"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const UserRepository = data_source_1.AppDataSource.getRepository(User_1.User);
exports.default = UserRepository;
