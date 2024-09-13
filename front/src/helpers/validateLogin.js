export default function validateLogin(user) {
    const errors = {};

    if (!user.usuario) {
        errors.usuario = "Debes ingresar un usuario válido";
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