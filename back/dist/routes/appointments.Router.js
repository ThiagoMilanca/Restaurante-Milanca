"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_Controller_1 = require("../controllers/appointments.Controller");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    (0, appointments_Controller_1.getAllAppointments)(req, res);
});
router.get("/:id", (req, res) => {
    (0, appointments_Controller_1.getAppointmentById)(req, res);
});
router.post("/schedule", (req, res) => {
    (0, appointments_Controller_1.createAppointment)(req, res);
});
router.put("/:id/cancel", (req, res) => {
    (0, appointments_Controller_1.cancelAppointment)(req, res);
});
exports.default = router;
