export default {
    Mutation: {
        crearPrecio: async (_, args, {models}) => {
            try {
                const precio = await models.Precio.create(args);
                return await models.Precio.findOne({
                    where: { id_precio: precio.id_precio },
                    include: [{ 
                        model: models.Monto, as: 'monto',
                        include: [{ model: models.Moneda, as: 'moneda' }]
                    }],
                });
            } catch (err) {
                throw err;
            }
        },
        editarPrecio: async (_, args, {models}) => {
            try {
                const { id_precio } = args;
                await models.Precio.update(
                    args, 
                    { where: { id_precio }}
                )
                const precio = await models.Precio.findOne({
                    where: { id_precio },
                    include: [
                        {   
                            model: models.Moneda,    
                            as: 'moneda',
                            required: true
                        },
                    ],
                })
                return precio;
            } catch (err) {
                throw err;
            }
        },
        cambiarEstadoPrecio: async (_, { id_precio }, { models }) => {
            try {
                const estadoActual = await models.Precio.findOne({ where: { id_precio }, attributes: ['activo']})
                await models.Precio.update(
                    { activo: !estadoActual.activo }, 
                    { where: { id_precio }}
                );
                return await models.Precio.findOne({ where: { id_precio }});
            } catch (err) {
                throw err;
            }
        }
    }
}