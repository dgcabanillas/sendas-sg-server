export default {
    Query: {
        modulos: async (_, { id_curso_aperturado }, { models }) => {
            try {
                const course = await models.CursoAperturado.findOne({
                    attributes: [],
                    include: [
                        {
                            model: models.Modulo,      
                            required: false,
                            as: 'modulos', 
                            include: [
                                {
                                    model: models.Precio, 
                                    required: false,
                                    as: 'precio_modulo',
                                    include: [{ model: models.Moneda, as: 'moneda' }],
                                    where: { activo: true }
                                }
                            ],
                            order: ['nro_modulo'],
                        }
                    ],
                    where: { id_curso_aperturado },
                });

                return course?.modulos || [];
            } catch ( err ) {
                throw err;
            }
        }
    },
    Mutation: {
        crearModulo: async (_, args, {models}) => {
            try {
                args.modulo = args.modulo.trim();
                args.fecha_inicio = args.fecha_inicio !== '' ? new Date(args.fecha_inicio.trim()) : null;
                args.fecha_fin = args.fecha_fin !== '' ? new Date(args.fecha_fin.trim()) : null;
                
                const { nro_modulo, id_curso_aperturado } = args;
                const moduleId = await models.Modulo.findOne({
                    where: {nro_modulo, id_curso_aperturado},
                    attributes: ['id_modulo']
                });
                if(moduleId) throw new Error('Ya existe ese número de módulo');
                return await models.Modulo.create(args);
            } catch (err) {
                throw err;
            }
        },
        editarModulo: async (_, args, {models}) => {
            try {
                const {id_modulo, nro_modulo} = args;
                const module = await models.Modulo.findOne({
                    where: {id_modulo},
                    attributes: ['id_modulo', 'id_curso_aperturado']
                });

                if(module) {
                    const newModule = await models.Modulo.findOne({
                        where: {
                            nro_modulo, 
                            id_curso_aperturado: module.id_curso_aperturado
                        },
                        attributes: ['id_modulo']
                    });
                    if( !newModule || newModule.id_modulo === module.id_modulo ) {
                        await models.Modulo.update(args, {where: {id_modulo}});
                        return await models.Modulo.findOne({where: {id_modulo}});
                    } else {
                        throw new Error('El número de modulo no puede repetirse');
                    }
                }
                throw new Error('No existe el módulo');
            } catch (err) {
                throw err;
            }
        },
        borrarModulo: async (_, args, {models}) => {
            try {
                const {id_modulo} = args;
                const moduleId = await models.Modulo.findOne({
                    where: {id_modulo},
                    attributes: ['id_modulo']
                });
                if(moduleId) {
                    await models.Modulo.destroy({where: {id_modulo}});
                    return true;
                }
                throw new Error({'error': 'No existe el módulo'});
            } catch (err) {
                throw err;
            }
        }
    }
}