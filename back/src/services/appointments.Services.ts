import { Appointment, STATUS} from "../entities/Appoiment";
import AppointmentRepository from "../repositories/AppoimentRepository";
import UserRepository from "../repositories/UserRepository";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments = await AppointmentRepository.find();
  return appointments;
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = await AppointmentRepository.findOneBy({ id });
  return appointment;
};

export const createAppointmentService = async (
  appointmentData: Appointment
): Promise<Appointment> => {
  const newAppointment = await AppointmentRepository.create(appointmentData);
  await AppointmentRepository.save(newAppointment);

  const user = await UserRepository.findOneBy({ id: newAppointment.userId });

  if (user) {
    newAppointment.user = user;
    await AppointmentRepository.save(newAppointment);
  }

  newAppointment.status = STATUS.active;

  await AppointmentRepository.save(newAppointment);

  return newAppointment;
};

export const cancelAppointmentService = async (id: number) => {
  const result = await AppointmentRepository.update({ id }, { status: STATUS.cancelled });

  if (result.affected === 0) {
    throw new Error("Cita no encontrada");
  }

  return result;
};