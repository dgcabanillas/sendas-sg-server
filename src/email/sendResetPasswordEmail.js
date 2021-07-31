import jwt from 'jsonwebtoken';
import { sendEmail } from './sendEmail';
import { resetPassword } from './templates/resetPassword';
import config from '../../config/app';

export const sendResetPasswordEmail = async ( args ) => { 
    try {
        const { nombre, apellido, email, secret } = args;

        const token = jwt.sign({ email, nombre, apellido }, secret, { expiresIn: '1h' });
        const link = config.env.CLIENT_URL + '/auth/reset-password/' + token;
        
        let mailOptions = {
            from:       "noreply <sistegagestion.v001@gmail.com>", 
            to:         email,
            subject:    'Recuperar cuenta',
            html:       resetPassword({ nombre, apellido, link })
        };
        
        await sendEmail( mailOptions );
    } catch (e) {
        throw new Error(e.message);
    }
}