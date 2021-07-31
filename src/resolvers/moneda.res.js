import { UserInputError } from 'apollo-server';

export default {
    Query: {
        monedas: async (_, __, {models}) => {
            try {
                return await models.Moneda.findAll();
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        crearMoneda: async (_, args, {models}) => {
            try {
                const errors = {}
                args.codigo = args.codigo.trim();
                args.moneda = args.moneda.trim();
                args.simbolo = args.simbolo.trim();
                const { codigo, moneda, simbolo } = args;

                if( codigo.length === 0 ) errors.codigo = "Código no válido";
                if( moneda.length === 0 ) errors.moneda = "Moneda no válida";
                if( simbolo.length === 0 ) errors.simbolo = "Símbolo no válido";

                if( Object.keys(errors).length > 0 ) {
                    throw new UserInputError('Errors', { errors });
                }

                const moendaId = await models.Moneda.findOne({
                    where: {codigo, moneda},
                    attributes: ['id_moneda']
                }); 
                if(moendaId) throw new Error('La moneda ya existe');

                return await models.Moneda.create(args);
            } catch (err) {
                throw err;
            }
        },
        editarMoneda: async (_, args, {models}) => {
            try {
                const errors = {}
                args.codigo = args.codigo.trim();
                args.moneda = args.moneda.trim();
                args.simbolo = args.simbolo.trim();
                const { id_moneda, codigo, moneda, simbolo } = args;

                if( codigo.length === 0 ) errors.codigo = "Código no válido";
                if( moneda.length === 0 ) errors.moneda = "Moneda no válida";
                if( simbolo.length === 0 ) errors.simbolo = "Símbolo no válido";

                if( Object.keys(errors).length > 0 ) {
                    throw new UserInputError('Errors', { errors });
                }

                const moendaId = await models.Moneda.findOne({
                    where: {id_moneda},
                    attributes: ['id_moneda']
                }); 
                if(!moendaId) throw new Error('La moneda no existe');

                await models.Moneda.update(args, {where: {id_moneda}});
                return await models.Moneda.findOne({where: {id_moneda}});
            } catch (err) {
                throw err;
            }
        }
    }
}