export default function validateUser(user) {
    const emailRegexp = /\S+@\S+\.\S+/;
    const errors = {};

    if (!user.nombre) {
        errors.nombre = "Debes ingresar un nombre";
    }

    if (!user.usuario) {
        errors.usuario = "Debes ingresar un usuario válido";
    }

    if (!emailRegexp.test(user.email)) {
        errors.email = "Debes ingresar un email válido";
    }

    if (!user.fecha) {
        errors.fecha = "Debes ingresar una fecha de nacimiento";
    }

    if (!user.dni) {
        errors.dni = "Debes ingresar un número de DNI";
    }

    if (!user.contraseña) {
        errors.contraseña = "Debe ingresar una contraseña";
    } else {
        if (user.contraseña.length < 8) {
            errors.contraseña = "La contraseña debe tener al menos 8 caracteres";
        }
    }

    return errors;
}