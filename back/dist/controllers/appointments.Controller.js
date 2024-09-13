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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointments_Services_1 = require("../services/appointments.Services");
const Appoiment_1 = require("../entities/Appoiment");
const data_source_1 = require("../config/data-source");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointments_Services_1.getAllAppointmentsService)();
        res.status(200).json({ appointments });
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener todos los turnos" });
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = Number(req.params.id);
        const appointment = yield (0, appointments_Services_1.getAppointmentByIdService)(appointmentId);
        if (!appointment) {
            res.status(404).json({ message: "Turno no encontrado" });
        }
        else {
            res.status(200).json({ appointment });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el turno por ID" });
    }
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, date, time } = req.body;
        const user = yield data_source_1.UserModel.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const appointmentData = {
            userId,
            date,
            time,
            id: 0,
            status: Appoiment_1.STATUS.active,
            user,
        };
        const newAppointment = yield (0, appointments_Services_1.createAppointmentService)(appointmentData);
        res.status(201).json({
            message: "Turno creado exitosamente",
            appointment: newAppointment,
        });
    }
    catch (error) {
        res.status(400).json({ message: "Error al crear el turno" });
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = Number(req.params.id);
        yield (0, appointments_Services_1.cancelAppointmentService)(appointmentId);
        res.status(200).json({ message: "Turno cancelado exitosamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al cancelar el turno" });
    }
});
exports.cancelAppointment = cancelAppointment;
