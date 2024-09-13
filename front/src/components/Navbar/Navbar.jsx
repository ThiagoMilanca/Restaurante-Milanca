import {NavLink} from 'react-router-dom'
import logo from '../../assets/Mn-removebg.png';
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <>
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <h1>Restaurante Milanca</h1>
            <div className={styles.navbarRight}>
                <ul>
                    <li><NavLink to={'/menu'} className={({ isActive }) => (isActive ? styles.active : null)} >MENU</NavLink></li>
                    <li><NavLink to={'/login'} className={({ isActive }) => (isActive ? styles.active : null)} >LOGIN</NavLink></li>
                    <li><NavLink to={'/register'} className={({ isActive }) => (isActive ? styles.active : null)} >REGISTER</NavLink></li>
                    <li><NavLink to={'/appointments'} className={({ isActive }) => (isActive ? styles.active : null)} >MIS TURNOS</NavLink></li>
                </ul>
            </div>
        </nav>
        <div className={styles.spacer}></div>
        </>
    );
};

export default Navbar;
