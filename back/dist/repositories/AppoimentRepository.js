"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Appoiment_1 = require("../entities/Appoiment");
const AppointmentRepository = data_source_1.AppDataSource.getRepository(Appoiment_1.Appointment);
exports.default = AppointmentRepository;
