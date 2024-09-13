import { useEffect } from 'react';
import Turno from '../../components/Turno/SingleShift';
import styles from './MisTurnos.module.css';
import axios from 'axios';
import { STATUS } from '../../helpers/myTurns';
import { useSelector, useDispatch } from 'react-redux';
import { allAppointments } from '../../redux/userSlice';
import Appointments from "../../components/Appointment/Appointment";

function MisTurnos() {
    const userId = useSelector((state) => state.actualUser.userId.user);
    const appointments = useSelector((state) => state.actualUser.userAppointments);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3007/users/${userId}`).then((res) => dispatch(allAppointments(res.data.appointments)));
        }
    }, [userId, dispatch]);

    const cancelTurn = (id) => {
        axios.put(`http://localhost:3007/appointments/${id}/cancel`, { status: STATUS.CANCELLED })
            .then((res) => {
                dispatch(allAppointments(res.data.appointments));
            })
            .catch((error) => {
                console.error('Error cancelling appointment:', error);
            });
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.header}>Mis Turnos</h1>
                <ul className={styles.turnoList}>
                    {Array.isArray(appointments) && appointments.map(turno => (
                        <li key={turno.id} className={styles.styTur}>
                            <Turno
                                id={turno.id}
                                date={turno.date}
                                time={turno.time}
                                status={turno.status}
                                userId={turno.userId}
                                onCancel={cancelTurn}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <Appointments />
        </>
    );
}

export default MisTurnos;
