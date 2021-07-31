import jwt from 'jsonwebtoken';

export const createToken = async( user, secret ) => {
    const token = jwt.sign(
        {
            id_usuario: user.id_usuario,
            rol:        user.rol,
            email:      user.email,
            nombre:     user.nombre,
            apellido:   user.apellido,
            imagen:     user.imagen,
        }, 
        secret, 
        { expiresIn: '1h' }
    );
    return token;
}

export const getData = ( token, secret ) => {
    return jwt.verify( token, secret );
}

export const formatWord = ( str ) => {
    // " heLLo  WORld  " -> "Hello World"
    let arrStr = str.split(' ').filter( s => s.length );
    if( arrStr.length == 0 ) return "";
    arrStr = arrStr.map( s => s[0].toUpperCase() + s.substr(1, s.length - 1).toLowerCase() );
    return arrStr.join(' ');
}