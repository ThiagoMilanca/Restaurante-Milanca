import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css';

const Home = () => {
  const [countdown, setCountdown] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/menu');
    }, 7000);

    return () => {
      clearInterval(redirectTimer);
      clearTimeout(redirect);
    };
  }, [navigate]);
  return (
    <div className={styles["homeContainer"]}>
      <h1 className={styles["title"]}>Bienvenido a nuestro Restaurante</h1>
      <h2 className={styles["mensajito"]}>{`Bienvenido, serás redirigido a nuestro menú en ${countdown} segundos...`}</h2>
    </div>
  );
};

export default Home;
