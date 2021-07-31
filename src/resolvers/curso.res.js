import { UserInputError } from 'apollo-server';
import { Op } from 'sequelize';

export default {
    Query: {
        curso: async (_, { id_curso }, {models}) => {
            try {
                const curso = await models.Curso.findOne({
                    include: [
                        {model: models.Area, as: 'area'},
                        {model: models.Categoria, as: 'categoria'},
                        {model: models.CursoAperturado, as: 'cursos_aperturados'}
                    ],
                    where: { id_curso }
                });
                return curso;
            } catch (err) {
                throw err;
            }
        },
        cursos: async (_, args, {models}) => {
            try {
                const cursos = await models.Curso.findAll({
                    include: [
                        {model: models.Area, as: 'area'},
                        {model: models.Categoria, as: 'categoria'},
                        {model: models.CursoAperturado, as: 'cursos_aperturados'}
                    ],
                    where: {id_curso: {[Op.not]: null}}
                });
                return cursos;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        crearCurso: async ( _, args, { models }) => {
            try {
                const errors = {} 
                const { id_curso, curso } = args;
                
                if(id_curso.length !== 5) errors.id_curso = 'El código debe tener 5 caracteres';
                if(curso.length < 8) errors.curso = 'El nombre del curso debe tener al menos 8 caracteres';

                const courseId = await models.Curso.findOne({where: {id_curso}, attributes: ['id_curso']});
                if(courseId) errors.id_curso = 'Código en uso';

                const courseName = await models.Curso.findOne({where: {curso}, attributes: ['curso']});
                if(courseName) errors.curso = 'Este curso ya existe';

                if(Object.keys(errors).length > 0) { 
                    throw new UserInputError('Errors', {errors});
                }

                const newCourse  = await models.Curso.create( args );
                return await models.Curso.findOne({
                    where: { id_curso: newCourse.id_curso },
                    include: [
                        { model: models.Area, as: 'area' },
                        { model: models.Categoria, as: 'categoria' },
                    ]
                });
            } catch( err ) {
                throw err;
            }
        },
        editarCurso: async ( _, args, { models }) => {
            try {
                args.curso = args.curso.trim();
                const {id_curso, curso} = args;

                const courseId = await models.Curso.findOne({where: {id_curso}, attributes: ['id_curso']});
                if(!courseId) throw new Error('El curso no existe');

                const courseData = await models.Curso.findOne({where: {curso}, attributes: ['id_curso']});
                if(courseData && courseData.id_curso !== id_curso) 
                    throw new UserInputError('Errors', { errors: { curso: 'Este nombre de curso en uso' }});

                if(curso.length < 8) 
                    throw new UserInputError('Errors', { errors: { curso: 'El nombre del curso debe tener al menos 8 caracteres' }});

                await models.Curso.update(args, { where: { id_curso }});

                const course = await models.Curso.findOne({
                    where: { id_curso },
                    include: [
                        { model: models.Area, as: 'area' },
                        { model: models.Categoria, as: 'categoria' },
                    ]
                });
                return course;
            } catch( err ) {
                throw err;
            }
        },
        borrarCurso: async ( _, args, { models }) => {
            try {
                const { id_curso } = args;
                const curso = await models.Curso.findOne({where: {id_curso}, attributes: ['id_curso']});
                if( !curso ) throw new Error({'error': 'El curso no existe'});
                
                await models.Curso.destroy({where: {id_curso}});
                return id_curso;
            } catch( err ) {
                throw err;
            }
        }
    }
}