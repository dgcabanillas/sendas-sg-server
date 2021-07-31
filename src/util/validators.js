import { formatWord } from "./helpers";

const validText = (text, field) => {
    const regex = /^[a-z ,.'-]+$/i;
    if( !text.match(regex) ) return 'El '+ field +' no debe contener carácteres especiales.';
    return '';
}

const validDNI = (dni) => {
    const regex = /^[0-9]{8,10}[A-Za-z]{0,2}$/;
    if( !dni.match(regex) ) return 'El DNI ingresado no es válido';
    return '';
}

const validEmail = (email) => {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if( !email.match(regex) ) return 'Ingrese un email válido.';
    return '';
}

export const validPassword = (pwd) => {
    if( pwd === '' ) return 'El password no debe ser vacío.';
    if( pwd.length < 6 ) return 'El password debe contener al menos 6 caracteres';
    return '';
}

export const loginValidator = ( args ) => {
    const errors = [];
    let { email, password } = args;
    let validacion;

    email = email.trim();
    validacion = validEmail( email );
    if( validacion.length > 0 ) errors.push({ error: 'email', description: validacion });
    
    validacion = validPassword( password );
    if( validacion.length > 0 ) errors.push({ error: 'password', description: validacion });

    const data = { email, password };

    return {
        data,
        errors,
        valid:  errors.length == 0
    }
}

export const registerValidator = ( args ) => {
    const errors = [];
    let { nombre, apellido, email, dni, password } = args;
    let validacion;

    nombre = formatWord(nombre);
    validacion = validText( nombre, 'nombre' );
    if( validacion.length > 0 ) errors.push({ error: 'nombre', description: validacion });

    apellido = formatWord(apellido);
    validacion = validText( apellido, 'apellido' );
    if( validacion.length > 0 ) errors.push({ error: 'apellido', description: validacion });

    email = email.trim();
    validacion = validEmail( email );
    if( validacion.length > 0 ) errors.push({ error: 'email', description: validacion });

    dni = dni.trim();
    validacion = validDNI( dni );
    if( validacion.length > 0 ) errors.push({ error: 'dni', description: validacion });
    
    validacion = validPassword( password );
    if( validacion.length > 0 ) errors.push({ error: 'password', description: validacion });

    const data = { nombre, apellido, email, dni, password };

    return {
        data,
        errors,
        valid:  errors.length == 0
    }
}

export const registerByAdminValidator = ( args ) => {
    const errors = {};
    let { nombre, apellido, email, dni } = args;
    let validacion;

    nombre = formatWord(nombre);
    validacion = validText( nombre, 'nombre' );
    if( validacion.length > 0 ) errors['nombre'] = validacion;

    apellido = formatWord(apellido);
    validacion = validText( apellido, 'apellido' );
    if( validacion.length > 0 ) errors['apellido'] = validacion;

    email = email.trim();
    validacion = validEmail( email );
    if( validacion.length > 0 ) errors['email'] = validacion;

    dni = dni.trim();
    validacion = validDNI( dni );
    if( validacion.length > 0 ) errors['dni'] = validacion;

    const data = { nombre, apellido, email, dni, ...args };

    return {
        data,
        errors,
        valid: Object.keys(errors).length == 0
    }
}