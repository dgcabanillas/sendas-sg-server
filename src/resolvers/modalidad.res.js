export default {
    Query: {
        modalidades: async (_, __, {models}) => {
            try {
                const modalidades = await models.Modalidad.findAll();
                return modalidades;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        crearModalidad: async (_, args, {models}) => {
            try {
                args.modalidad = args.modalidad.trim();
                return await models.Modalidad.create(args);
            } catch ( err ) {
                throw err;
            }
        },
        editarModalidad: async (_, args, {models}) => {
            try {
                args.modalidad = args.modalidad.trim();
                const { id_modalidad } = args;

                await models.Modalidad.update(
                    args, 
                    { where: { id_modalidad }}
                )

                const modalidad = await models.Modalidad.findOne({ where: { id_modalidad }})
                return modalidad;
            } catch ( err ) {
                throw err;
            }
        },
        borrarModalidad: async (_, args, {models}) => {
            try {
                const { id_modalidad } = args;
                await models.Modalidad.destroy({ where: { id_modalidad }});
            } catch ( err ) {
                throw err;
            }
        }
    }
}