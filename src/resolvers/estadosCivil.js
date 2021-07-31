export default {
    Query: {
        estadosCivil: async ( _, __, { models } ) => {
            try {
                const estadosCivil = await models.EstadoCivil.findAll();
                return estadosCivil;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        crearEstadoCivil: async (_, args, {models}) => {

            return null; // EstadoCivil
        },
        editarEstadoCivil: async (_, args, {models}) => {

            return null; // EstadoCivil
        },
        borrarEstadoCivil: async (_, args, {models}) => {

            return false; // boolean
        }
    }
}