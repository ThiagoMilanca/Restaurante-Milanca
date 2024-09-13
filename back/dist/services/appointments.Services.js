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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const Appoiment_1 = require("../entities/Appoiment");
const AppoimentRepository_1 = __importDefault(require("../repositories/AppoimentRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield AppoimentRepository_1.default.find();
    return appointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppoimentRepository_1.default.findOneBy({ id });
    return appointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield AppoimentRepository_1.default.create(appointmentData);
    yield AppoimentRepository_1.default.save(newAppointment);
    const user = yield UserRepository_1.default.findOneBy({ id: newAppointment.userId });
    if (user) {
        newAppointment.user = user;
        yield AppoimentRepository_1.default.save(newAppointment);
    }
    newAppointment.status = Appoiment_1.STATUS.active;
    yield AppoimentRepository_1.default.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AppoimentRepository_1.default.update({ id }, { status: Appoiment_1.STATUS.cancelled });
    if (result.affected === 0) {
        throw new Error("Cita no encontrada");
    }
    return result;
});
exports.cancelAppointmentService = cancelAppointmentService;
