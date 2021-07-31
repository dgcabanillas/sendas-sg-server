import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server';
import { createToken, getData } from '../util/helpers';
import { 
    loginValidator,
    registerByAdminValidator,
    registerValidator,
    validPassword
} from '../util/validators';

// emails
import { sendResetPasswordEmail }   from '../email/sendResetPasswordEmail';
import { sendWelcomeEmail }         from '../email/sendWelcomeEmail';

export default {
    Query: {
        profile: async (_, args, { models }) => {
            try {
                const { id_usuario } = args;
                return await models.Usuario.findOne({ 
                    /*include: [
                        { model: models.Logro,   as: 'logros',   required: false },
                        { model: models.Estudio, as: 'estudios', required: false },
                        { model: models.Trabajo, as: 'trabajos', required: false },
                    ],*/
                    where: { id_usuario }
                });
            } catch (e) {
                throw new Error(e.message);
            }
        },
    },
    Mutation: {
        login: async (_, args, { models, SECRET }) => {
            try {
                const { data, valid, errors } = loginValidator( args );

                // if the args are not valid, return
                if( !valid ) return { token: '', errors };

                const { email, password } = data;

                // user must exist
                const user = await models.Usuario.findOne({where: { email }});
                if ( !user ) throw new Error('Correo no registrado');
                    
                // passwords must match
                const matched = await bcrypt.compare( password, user.password );
                if( !matched ) throw new Error('Correo o contraseña incorrectos');

                return { token: await createToken(user, SECRET), errors: [] };
            } catch (e) {
                throw new Error(e.message);
            }
        },
        register: async (_, args, { models, SECRET }) => {
            try {
                const { data, valid, errors } = registerValidator(args);

                // if the args are not valid, return
                if ( !valid ) return { token: '', errors };

                const { nombre, apellido, email, dni } = data;
            
                // the email must not be repeated
                let user = await models.Usuario.findOne({ where: { email }, attributes: ['id_usuario'] });
                if ( user ) errors.push({ error: 'email', description: 'Este correo ya está en uso' });
                
                // the DNI must be unique
                user = await models.Usuario.findOne({ where: { dni }, attributes: ['id_usuario'] });
                if ( user ) errors.push({ error: 'dni', description: 'Este DNI ya ha sido registrado' })

                // finish if there are errors 
                if( errors.length > 0) return { token: '', errors };

                data.password = await bcrypt.hash(data.password, 12);
                const newUser = await models.Usuario.create( data );

                await sendWelcomeEmail({ nombre, apellido, email, secret: SECRET });

                return { token: await createToken(newUser, SECRET), errors: [] };
            } catch (e) {
                throw new Error(e.message);
            }
        },
        registerByAdmin: async (_, args, { models, SECRET }) => {
            let error = false;
            try {
                args.telefono_celular = args.telefono_celular.trim() || null;

                const { data, valid, errors } = registerByAdminValidator(args);
                if( !valid ) {
                    error = true;
                    throw new UserInputError('Errors', { errors });
                }

                // the email must not be repeated
                let user = await models.Usuario.findOne({ where: { email: data.email }, attributes: ['id_usuario'] });
                if ( user ) errors['email'] = 'Este correo ya está en uso';
                
                // the DNI must be unique
                user = await models.Usuario.findOne({ where: { dni: data.dni }, attributes: ['id_usuario'] });
                if ( user ) errors['dni'] = 'Este DNI ya ha sido registrado';

                // finish if there are errors 
                if( Object.keys(errors).length > 0) {
                    error = true;
                    throw new UserInputError('Errors', { errors });
                }

                data['password'] = await bcrypt.hash(data.dni, 12);
                const newUser = await models.Usuario.create( data );
                await sendWelcomeEmail({ 
                    nombre:     data.nombre, 
                    apellido:   data.apellido, 
                    email:      data.email, 
                    secret:     SECRET 
                });
                return await models.Usuario.findOne({ where: { id_usuario: newUser.id_usuario }});
                
            } catch (err) {
                console.log( err );
                if( error ) throw err;
                else throw new Error('Algo salió mal');
            }
        },

        confirmAccountFromLink: async (_, args, { models, SECRET }) => {
            try {
                const { token } = args;
                const { email } = getData( token, SECRET );
                const user = await models.Usuario.findOne({ 
                    where: { email },
                    attributes: ['id_usuario']
                });
                if( !user ) throw new Error();

                await models.Usuario.update(
                    { estado_usuario: 'VERIFICADO' }, 
                    { where: { id_usuario: user.id_usuario }}
                );

                return true;
            } catch {
                throw new Error('Algo salió mal en la confirmación de su cuenta');
            }
        },
        recover: async (_, args, { models, SECRET }) => {
            try {
                const { email } = args;
                const user = await models.Usuario.findOne({ 
                    where: { email },
                    attributes: ['id_usuario', 'nombre', 'apellido']
                });
                if( !user ) throw new Error('Este correo no está registrado.')

                const { nombre, apellido } = user;
                await sendResetPasswordEmail({ nombre, apellido, email, secret: SECRET });
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        },
        resetPassword: async (_, args, { models, SECRET }) => {
            try {
                const { token, password } = args;
                const { email } =  getData(token, SECRET);

                const user = await models.Usuario.findOne({ 
                    where: { email },
                    attributes: ['id_usuario']
                });
                if( !user ) throw new Error('No existe usuario asociado a este correo');

                const validationResult = validPassword( password );
                if( validationResult ) return { errors: [{ error: 'password', description: validationResult }]};

                const hashedPassword = await bcrypt.hash(password, 12);
                await models.Usuario.update(
                    { password: hashedPassword }, 
                    { where: { id_usuario: user.id_usuario }}
                );

                return { errors: [] };
            } catch (e) {
                throw new Error(e.message);
            }
        },
    }
}