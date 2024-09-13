import { Request, Response } from "express";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
} from "../services/appointments.Services";
import { Appointment, STATUS } from "../entities/Appoiment";
import { UserModel } from "../config/data-source";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointmentsService();
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los turnos" });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointmentId = Number(req.params.id);
    const appointment = await getAppointmentByIdService(appointmentId);
    if (!appointment) {
      res.status(404).json({ message: "Turno no encontrado" });
    } else {
      res.status(200).json({ appointment });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el turno por ID" });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { userId, date, time } = req.body;

    const user = await UserModel.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const appointmentData: Appointment = {
      userId,
      date,
      time,
      id: 0,
      status: STATUS.active,
      user,
    };

    const newAppointment = await createAppointmentService(appointmentData);

    res.status(201).json({
      message: "Turno creado exitosamente",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el turno" });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = Number(req.params.id);

    await cancelAppointmentService(appointmentId);

    res.status(200).json({ message: "Turno cancelado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar el turno" });
  }
};