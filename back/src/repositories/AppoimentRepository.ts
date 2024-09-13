import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appoiment";

const AppointmentRepository = AppDataSource.getRepository(Appointment);

export default AppointmentRepository;