import { UserInputError } from 'apollo-server';

export default {
    Query: {
        generos: async ( _, __, { models } ) => {
            try {
                const generos = await models.Genero.findAll();
                return generos;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        crearGenero: async (_, args, {models}) => {
            let error = false;
            try {
                args.id_genero = args.id_genero.trim();
                const genero = await models.Genero.findOne({ where: { id_genero: args.id_genero }})
                if( genero ) {
                    error = true;
                    throw new UserInputError('Errors', { errors: { id_genero: 'Este género ya existe' }});
                }
                return await models.Genero.create({ args });
            } catch ( err ) {
                if( error ) {
                    throw err;
                } else {
                    throw new Error('Algo salió mal');
                }
            }
        },
        editarGenero: async (_, args, {models}) => {
            let error = false;
            try {
                args.genero = args.genero.trim();

                const genero = await models.Genero.findOne({ where: { id_genero: args.genero }})
                if( args.genero == args.id_genero ) return genero;

                if( genero ) {
                    error = true;
                    throw new UserInputError('Errors', { errors: { genero: 'Este género ya existe' }});
                }
                await models.Genero.update(
                    { id_genero: args.genero },
                    { where: { id_genero: args.id_genero }}
                );
                return await models.Genero.findOne({ where: { id_genero: args.genero }});
            } catch ( err ) {
                if( error ) {
                    throw err;
                } else {
                    throw new Error('Algo salió mal');
                }
            }
        },
        borrarGenero: async (_, args, {models}) => {
            try {
                const { id_genero } = args;
                await models.Genero.destroy({ where: { id_genero }});
                return id_genero;
            } catch {
                throw new Error('Algo salió mal');
            }
        }
    }
}