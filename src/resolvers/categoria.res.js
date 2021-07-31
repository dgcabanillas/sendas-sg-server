export default {
    Query: {
        categorias: async (_, __, { models }) => {
            try {
                const categorias = await models.Categoria.findAll();
                return categorias;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        crearCategoria: async (_, args, { models }) => {
            try {
                args.categoria = args.categoria.trim();
                return await models.Categoria.create(args);
            } catch ( err ) {
                throw err;
            }
        },
        editarCategoria: async (_, args, { models }) => {
            try {
                args.categoria = args.categoria.trim();
                const { id_categoria } = args;

                await models.Categoria.update(
                    args, 
                    { where: { id_categoria }}
                )

                const categoria = await models.Categoria.findOne({ where: { id_categoria }})
                return categoria;
            } catch ( err ) {
                throw err;
            }
        },
        borrarCategoria: async (_, args, { models }) => {
            try {
                const { id_categoria } = args;
                await models.Categoria.destroy({ where: { id_categoria }});
            } catch ( err ) {
                throw err;
            }
        }
    }
}