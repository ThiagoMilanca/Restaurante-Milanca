import axios from "axios";
import validateUser from "../../helpers/ValidateUser";
import { useState } from "react";
import styles from "./Register.module.css";

function FormRegister() {
    const [input, setInput] = useState({
        nombre: "",
        usuario: "",
        email: "",
        fecha: "",
        dni: "",
        contraseña: "",
        showPassword: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
        setErrors((prevErrors) =>
            validateUser({
                ...input,
                [name]: value,
            })
        );
    };

    const handleTogglePasswordVisibility = () => {
        setInput((prevInput) => ({
            ...prevInput,
            showPassword: !prevInput.showPassword,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const input2 = {
            name: input.nombre,
            username: input.usuario,
            email: input.email,
            birthdate: input.fecha,
            nDni: input.dni,
            password: input.contraseña,
        };



            axios.post("http://localhost:3007/users/register", input2)
                .then(response => {
                    alert("Usuario creado correctamente :)");
                    setInput({
                        nombre: "",
                        usuario: "",
                        email: "",
                        fecha: "",
                        dni: "",
                        contraseña: "",
                        showPassword: false,
                    });
                })
                .catch(error => {
                    alert("Error al crear el usuario :(");
                    console.error(error);
                });
        }


    return (
        <div className={styles["form-container"]}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>FORMULARIO DE REGISTRO</h1>
                <div className={styles["inputs-container"]}>
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            onChange={handleChange}
                            value={input.nombre}
                            placeholder="Ingresa tu nombre"
                            required
                        />
                        {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
                    </div>

                    <div>
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            onChange={handleChange}
                            value={input.usuario}
                            placeholder="Ingresa tu nombre de usuario"
                            required
                        />
                        {errors.usuario && <p className={styles.error}>{errors.usuario}</p>}
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={input.email}
                            placeholder="Ingresa tu email"
                            required
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="fecha">Fecha de nacimiento</label>
                        <input
                            type="text"
                            id="fecha"
                            name="fecha"
                            onChange={handleChange}
                            value={input.fecha}
                            placeholder="Ingresa tu fecha de nacimiento"
                            required
                        />
                        {errors.fecha && <p className={styles.error}>{errors.fecha}</p>}
                    </div>

                    <div>
                        <label htmlFor="dni">D.N.I</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            onChange={handleChange}
                            value={input.dni}
                            placeholder="Ingresa tu número de D.N.I"
                            required
                        />
                        {errors.dni && <p className={styles.error}>{errors.dni}</p>}
                    </div>

                    <div>
                        <label htmlFor="contraseña">Contraseña</label>
                        <div className={styles.passwordField}>
                            <input
                                type={input.showPassword ? "text" : "password"}
                                id="contraseña"
                                name="contraseña"
                                onChange={handleChange}
                                value={input.contraseña}
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
                        {errors.contraseña && <p className={styles.error}>{errors.contraseña}</p>}
                    </div>

                    <input
                        type="submit"
                        value="Enviar"
                        disabled={Object.values(errors).some(error => error)}
                    />
                </div>
            </form>
        </div>
    );
}

export default FormRegister;
