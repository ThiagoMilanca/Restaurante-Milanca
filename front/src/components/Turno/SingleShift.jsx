import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { STATUS } from '../../helpers/myTurns';
import styles from './SingleShift.module.css';

const Turno = ({ id, date, time, status,  nDni, name, }) => {
    const [turnoStatus, setTurnoStatus] = useState(status);

    const statusClass = turnoStatus === STATUS.ACTIVE ? styles.active : styles.cancelled;
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };
    const formattedDate = formatDate(date);

    const handleCancel = async () => {
        try {
            console.log('Cancelando turno...');
            const response = await axios.put(`http://localhost:3007/appointments/${id}/cancel`);
            console.log(response.data.message);
            setTurnoStatus(STATUS.CANCELLED);
        } catch (error) {
            console.error('Error al cancelar el turno:', error);
        }
    };

    return (
        <div className={styles.turnoItem}>
            <div>
                <h2>Nº de Turno: {id}</h2>
                <p><strong>Fecha: </strong> {formattedDate}</p>
                <p><strong>Hora:</strong> {time}</p>
                <p className={`${styles.statusText} ${statusClass}`}>
                    Status: {turnoStatus === STATUS.ACTIVE ? 'Activo' : 'Cancelado'}
                </p>
                <button onClick={turnoStatus === STATUS.ACTIVE ? handleCancel : null} disabled={turnoStatus !== STATUS.ACTIVE}>Cancelar</button>
            </div>
        </div>
    );
};

Turno.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.oneOf([STATUS.ACTIVE, STATUS.CANCELLED]).isRequired,
    onCancel: PropTypes.func,
};

export default Turno;
