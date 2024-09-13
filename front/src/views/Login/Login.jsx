import { useState } from 'react';
import validateLogin from '../../helpers/validateLogin'; 
import axios from "axios";
import styles from "../Login/Login.module.css"
import { useDispatch  } from "react-redux";
import { addUserId } from '../../redux/userSlice';
import {useNavigate} from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "Debe ingresar un username",
        password: ""
    });

    //const userId = useSelector(state => state.user.userId);

    const handleTogglePasswordVisibility = () => {
        setInput((prevInput) => ({
            ...prevInput,
            showPassword: !prevInput.showPassword,
        }));
    };
    


    const handleChange = (event) => {
        setInput({
          ...input,
          [event.target.name]: event.target.value,
        });
        setErrors(
          validateLogin({
            ...input,
            [event.target.name]: event.target.value,
          })
        );
    };


    

    const funcionDeLogueo= async () => {
        try {
            await axios.post("http://localhost:3007/users/login", input)
            .then(({
                data
            })=> {
            dispatch(addUserId(data.user.id));
            console.log(data.user.id)
        navigate('/appointments') })

        }catch (error) {
            console.error("Error ", error);
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                alert("Error: No se pudo conectar con el servidor.");
            } else {
                alert("Error: Ocurrió un error durante la solicitud.");
            }
    }}



    const handleSubmit = async (event) => {
        event.preventDefault();
        
 
       await funcionDeLogueo();
       
      
         
        
    }
     


    return (
        <div className={styles.container}>
            <div className={styles.centeredContent}>
                <div className={styles["conteiner-title"]}><h1 className={styles["login-title"]}>INICIAR SESIÓN</h1></div>
                <form onSubmit={handleSubmit} className={styles["login-form"]}>
                    <div>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={input.username}
                            placeholder="Ingresa tu nombre de usuario"
                            required
                        />
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <div className={styles.passwordField}>
                            <input
                                type={input.showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={input.password}
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleTogglePasswordVisibility}
                                className={styles.togglePasswordButton}
                            >
                                {input.showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    <input
                        type="submit"
                        value="Enviar"
                        disabled={!input.username || !input.password}
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;