import axios from "axios";
import { useState } from "react";
import styles from "./Appointment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../redux/userSlice";

function ScheduleForm() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.actualUser.userId.user);

    const [input, setInput] = useState({
        date: "",
        time: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    function validateScheduleForm(input) {
        let errors = {};

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 45);

        const selectedDate = new Date(input.date);

        if (!input.date.trim()) {
            errors.date = "La fecha es requerida";
        } else if (selectedDate < tomorrow) {
            errors.date = "La fecha debe ser a partir del día siguiente";
        } else if (selectedDate > maxDate) {
            errors.date = "La fecha no puede ser más de 45 días en el futuro";
        }

        const selectedTime = input.time;
        if (!input.time.trim()) {
            errors.time = "La hora es requerida";
        } else if (selectedTime < "09:00" || selectedTime > "23:00") {
            errors.time = "La hora debe estar entre las 9:00 y las 23:00";
        }

        return errors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateScheduleForm(input);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                const requestData = {
                    userId,
                    date: input.date,
                    time: input.time,
                };

                const response = await axios.post("http://localhost:3007/appointments/schedule", requestData, {
                    withCredentials: true,
                });

                console.log("Cita programada con éxito:", response.data.appointment);
                dispatch(addAppointment(response.data.appointment));
                alert("Cita programada con éxito :)");


            } catch (error) {
                console.error("Error al programar la cita:", error);
                alert("Error al programar la cita :(");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        }
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 45);

    const formatDate = (date) => {
        const d = new Date(date);
        const month = '' + (d.getMonth() + 1);
        const day = '' + d.getDate();
        const year = d.getFullYear();

        return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    };

    return (
        <div className={styles.container}>
            <div className={styles.centeredContent}>
                <h1 className={styles["schedule-title"]}>Programar Cita</h1>
                <form onSubmit={handleSubmit} className={styles["schedule-form"]}>
                    <div>
                        <label htmlFor="date">Fecha</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            onChange={handleChange}
                            value={input.date}
                            min={formatDate(tomorrow)}
                            max={formatDate(maxDate)}
                            placeholder="Selecciona la fecha"
                            required
                        />
                        {errors.date && <p className={styles.error}>{errors.date}</p>}
                    </div>

                    <div>
                        <label htmlFor="time">Hora</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            onChange={handleChange}
                            value={input.time}
                            min="09:00"
                            max="23:00"
                            placeholder="Selecciona la hora"
                            required
                        />
                        {errors.time && <p className={styles.error}>{errors.time}</p>}
                    </div>

                    <input
                        type="submit"
                        value={loading ? "Enviando..." : "Enviar"}
                        disabled={loading || Object.values(errors).some(error => error)}
                    />
                </form>
            </div>
        </div>
    );
}

export default ScheduleForm;
