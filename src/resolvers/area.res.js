export default {
    Query: {
        areas: async ( _, __, { models } ) => {
            try {
                const areas = await models.Area.findAll();
                return areas;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        crearArea: async (_, args, { models }) => {
            try {
                args.area = args.area.trim();
                return await models.Area.create(args);
            } catch ( err ) {
                throw err;
            }
        },
        editarArea: async (_, args, { models }) => {
            try {
                args.area = args.area.trim();
                const { id_area } = args;

                await models.Area.update(
                    args, 
                    { where: { id_area }}
                )

                const area = await models.Area.findOne({ where: { id_area }})
                return area;
            } catch ( err ) {
                throw err;
            }
        },
        borrarArea: async (_, args, { models }) => {
            try {
                const { id_area } = args;
                await models.Area.destroy({ where: { id_area }});
            } catch ( err ) {
                throw err;
            }
        }
    }
}