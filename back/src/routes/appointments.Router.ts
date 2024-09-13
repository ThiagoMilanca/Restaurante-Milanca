import { Router } from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  cancelAppointment
} from "../controllers/appointments.Controller";

const router: Router = Router();

router.get("/", (req, res) => {
  getAllAppointments(req, res);
});

router.get("/:id", (req, res) => {
  getAppointmentById(req, res);
});

router.post("/schedule", (req, res) => {
  createAppointment(req, res);
});

router.put("/:id/cancel", (req, res) => {
  cancelAppointment(req, res);
});

export default router;
