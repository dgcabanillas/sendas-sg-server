import { Op, QueryTypes } from 'sequelize';

export default {
    Query: {
        cursosAperturados: async (_, __, { models }) => {
            try {
                const cursos = await models.CursoAperturado.findAll({
                    include: [
                        {
                            model: models.Curso,       
                            as: 'curso',
                            include: [
                                {model: models.Area,        as: 'area'},
                                {model: models.Categoria,   as: 'categoria'},
                            ]
                        },
                        {model: models.Modalidad, as: 'modalidad'},
                    ]
                });
                return cursos;
            } catch ( err ) {
                throw new Error(err.message);
            }
        },
        cursoAperturado: async (_, args, { models }) => {
            try {
                const { id_curso_aperturado } = args;
                const curso = await models.CursoAperturado.findOne({
                    include: [{
                        model: models.Curso, as: 'curso',
                        include: [{
                            model: models.Area, as: 'area'
                        }, {
                            model: models.Categoria, as: 'categoria'
                        }]
                    }, {
                        model: models.Modalidad, as: 'modalidad' 
                    }, {
                        model: models.Precio, as: 'precios_matricula', required: false,
                        include: [{ 
                            model: models.Monto, as: 'monto',
                            include: [{ model: models.Moneda, as: 'moneda'}]
                        }],
                    }, {
                        model: models.MatriculaCurso, as: 'matriculas',
                        include: [{ 
                            model: models.Deuda, as: 'deuda',
                            include: [{ model: models.Usuario, as: 'usuario' }]
                        }]
                    }, {   
                        model: models.Modulo, as: 'modulos',
                        include: [{ 
                            model: models.Precio, as: 'precios_modulo',
                            include: [{
                                model: models.Monto, as: 'monto',
                                include: [{ model: models.Moneda, as: 'moneda' }]
                            }]
                        }, {
                            model: models.InscripcionModulo, as: 'inscripciones',
                            include: [{
                                model: models.Deuda, as: 'deuda',
                                include: [{ model: models.Usuario, as: 'usuario' }]
                            }]
                        }]
                    }, {
                        model: models.Usuario, as: 'profesores'
                    }],
                    where: { id_curso_aperturado }
                });
                return curso;
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        aperturarCurso: async (_, args, { models }) => {
            try {
                args.fecha_inicio = args.fecha_inicio !== '' ? new Date(args.fecha_inicio.trim()) : null;
                args.fecha_fin = args.fecha_fin !== '' ? new Date(args.fecha_fin.trim()) : null;
                return await models.CursoAperturado.create(args);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        editarCursoAperturado: async (_, args, {models}) => {
            try {
                const { id_curso_aperturado } = args;
                const capId = await models.CursoAperturado.findOne({
                    where: {id_curso_aperturado},
                    attributes: ['id_curso_aperturado']
                });
                if(capId) {
                    args.fecha_inicio = args.fecha_inicio !== '' ? new Date(args.fecha_inicio) : null;
                    args.fecha_fin = args.fecha_fin !== '' ? new Date(args.fecha_fin) : null;
                    await models.CursoAperturado.update(args, {where: {id_curso_aperturado}});
                    return await models.CursoAperturado.findOne({where: {id_curso_aperturado}});
                } else {
                    throw new Error({'error': 'El curso no existe'});
                }
            } catch (err) {
                throw err;
            }
        },
        borrarCursoAperturado: async (_, args, {models}) => {
            try {
                const { id_curso_aperturado } = args;
                await models.CursoAperturado.destroy({where: {id_curso_aperturado}});
                return id_curso_aperturado;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        cambiarEstadoCursoAperturado: async (_, args, {models}) => {
            let error_message = '¡Algo salió mal!';
            try {
                const {id_curso_aperturado} = args;
                const curso = await models.CursoAperturado.findOne({where: {id_curso_aperturado}});
                if( curso ) {
                    const estado = curso.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
                    await models.CursoAperturado.update({estado}, {where: {id_curso_aperturado}});
                    return await models.CursoAperturado.findOne({where: {id_curso_aperturado}});
                } else {
                    error_message = '¡El curso no existe!';
                    throw 'error';
                }
            } catch (err) {
                throw new Error(error_message);
            }
        },
        
        agregarPrecioMatricula: async (_, args, {models}) => {
            try {
                const {id_curso_aperturado, id_precio} = args;

                const data = await models.PrecioMatricula.findOne({
                    where: {id_precio, id_curso_aperturado}
                });
                if(data) throw new Error('El precio ya se encuentra asignado');

                const priceId = await models.Precio.findOne({
                    where: {id_precio},
                    attributes: ['id_precio']
                });
                if(!priceId) throw new Error('No existe precio');
                
                const courseId = await models.CursoAperturado.findOne({
                    where: {id_curso_aperturado},
                    attributes: ['id_curso_aperturado']
                });
                if(!courseId) throw new Error('No existe curso');

                await models.PrecioMatricula.create({
                    id_curso_aperturado, id_precio
                });
                return true;
            } catch (err) {
                throw err;
            }
        },
        eliminarPrecioMatricula: async (_, args, {models}) => {
            try {
                const {id_curso_aperturado, id_precio} = args;

                const enrollmentPrice = await models.PrecioMatricula.findOne({
                    where: {
                        id_curso_aperturado,
                        id_precio
                    }
                });
                if(!enrollmentPrice) throw new Error('Error con el precio asociado');

                await models.PrecioMatricula.destroy({ where: { id_curso_aperturado, id_precio }})

                // cambiamos el estado del precio para no afectar 
                // a los usuarios que ya pagaron 
                await models.Precio.update(
                    { activo: false },
                    { where: { id_precio }}
                );
                return [id_curso_aperturado, id_precio];
            } catch (err) {
                throw err;
            }
        }
    }
}