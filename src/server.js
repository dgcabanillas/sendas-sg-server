import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import bcrypt from 'bcrypt';
import data from './data';
import models from './models';
import typeDefs from './types';
import resolvers from './resolvers';

require('dotenv').config();

const SECRET = process.env.SECRET;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const apollo = new ApolloServer({
    schema,
    context: ({req}) => {
        return {
            models,
            SECRET,
        }
    }
})

const PORT = process.env.PORT || '4000';

models.sequelize.sync({ force: false })
    .then( () => {
        apollo.listen(PORT).then(({url}) => {
            console.log(`Servidor corriendo en: ${url}`);
        });
    })
    .then( async () => {
        if( false ) {
            await models.Area.bulkCreate(data.areas);
            await models.Categoria.bulkCreate(data.categorias);
            await models.Modalidad.bulkCreate(data.modalidades);
            await models.EstadoCivil.bulkCreate(data.estadosCivil);
            await models.Genero.bulkCreate(data.generos);

            const cursos = await models.Curso.bulkCreate(data.cursos);
            await models.Usuario.create({
                nombre:     'Diego',
                apellido:   'Cabanillas',
                rol:        'ADMIN',
                email:      'dg.cabanillas@uni.pe',
                dni:        '48445894',
                password:   await bcrypt.hash('123456', 12),
                id_genero:  'masculino',
            })

            /*const alumno = await models.Usuario.create({
                nombre: 'Carlos', apellido: 'Merino',
                usuario: 'carlosm', rol: 'ALUMNO', dni: '74589654', genero: 'masculino',
                email: 'barto.c.c.98@gmail.com', password: await bcrypt.hash( "123456", 12 ),
            });*/

            const profesor = await models.Usuario.create({
                nombre: 'César', apellido: 'Vásquez', 
                usuario: 'cesarv', rol: 'PROFESOR', dni: '48966412', id_genero: 'masculino',
                email: 'cesarv@correo.com', password: await bcrypt.hash( "123456", 12 ),
                imagen: 'https://sigabd.s3.amazonaws.com/perfiles/20201221-ye7z5tet-profe-png'
            });

            const dolar = await models.Moneda.create({codigo: 'USD', moneda: 'Dólares', simbolo: '$'});
            const soles = await models.Moneda.create({codigo: 'PEN', moneda: 'Soles', simbolo: 'S/.'});

            const montos = await models.Monto.bulkCreate([
                { id_moneda: dolar.id_moneda, monto: 10 },
                { id_moneda: soles.id_moneda, monto: 30 },
                { id_moneda: dolar.id_moneda, monto: 100 },
                { id_moneda: soles.id_moneda, monto: 390 },
                { id_moneda: dolar.id_moneda, monto: 150 },
                { id_moneda: soles.id_moneda, monto: 570 }
            ])
            
            const p_ext_1 = await models.Precio.create({
                id_monto: montos[0].id_monto,
                descripcion: 'Alumnos extranjeros',
                descuento: 50,
            });
            const p_loc_1 = await models.Precio.create({
                id_monto: montos[1].id_monto,
                descripcion: 'Alumnos locales', 
                descuento: 50,
            });
            const p_ext_2 = await models.Precio.create({
                id_monto: montos[2].id_monto,
                descripcion: 'Alumnos extranjeros', 
                descuento: 30,
            });
            const p_loc_2 = await models.Precio.create({
                id_monto: montos[3].id_monto,
                descripcion: 'Alumnos locales',
                descuento: 30
            });
            const p_ext_3 = await models.Precio.create({
                id_monto: montos[4].id_monto,
                descripcion: 'Alumnos extranjeros', 
                descuento: 20,
                tipo_descuento: 'cantidad',
            });
            const p_loc_3 = await models.Precio.create({
                id_monto: montos[5].id_monto,
                descripcion: 'Alumnos locales', 
                descuento: 80,
                tipo_descuento: 'cantidad',
            });

            const cursoAperturado = await models.CursoAperturado.create({
                periodo: '2021 1',
                id_modalidad: 2,
                descripcion: 'Aplicaciones en el campo clínico, educativo y comunitario',
                fecha_inicio: new Date('01-01-2021'),
                fecha_fin: new Date('06-25-2021'),
                id_curso: cursos[0].id_curso,
                imagen: 'https://sigabd.s3.amazonaws.com/perfiles/20201217-1tpar2qi-curso-imagen-nueva-png',
                pdf: 'https://sigabd.s3.amazonaws.com/cursos-pdf/20201217-nji7bpdl-brochure-terapia-y-pr-cticas-na',
                estado: 'ACTIVO',
            }); 

            const modulo_1 = await models.Modulo.create({
                id_curso_aperturado: cursoAperturado.id_curso_aperturado,
                nro_modulo: 1,
                modulo: 'La metáfra narrativa. Diferencias con el modelo sistemático',
                fecha_inicio: new Date('11-06-2020'),
                fecha_fin: new Date('11-07-2020'),
            });

            const modulo_2 = await models.Modulo.create({
                id_curso_aperturado: cursoAperturado.id_curso_aperturado,
                nro_modulo: 2,
                modulo: 'Las prácticas de externalización.',
                fecha_inicio: new Date('12-07-2020'),
                fecha_fin: new Date('12-08-2020'),
            });

            await models.PrecioMatricula.bulkCreate([
                {
                    id_curso_aperturado: cursoAperturado.id_curso_aperturado, 
                    id_precio: p_ext_1.id_precio
                },
                {
                    id_curso_aperturado: cursoAperturado.id_curso_aperturado, 
                    id_precio: p_loc_1.id_precio
                },
            ]);
            
            await models.PrecioModulo.bulkCreate([
                {
                    id_modulo: modulo_1.id_modulo, 
                    id_precio: p_ext_2.id_precio
                },
                {
                    id_modulo: modulo_1.id_modulo, 
                    id_precio: p_loc_2.id_precio
                },
                {
                    id_modulo: modulo_2.id_modulo, 
                    id_precio: p_ext_3.id_precio
                },
                {
                    id_modulo: modulo_2.id_modulo, 
                    id_precio: p_loc_3.id_precio
                },
            ]);

            await models.Profesor.create({
                id_curso_aperturado: cursoAperturado.id_curso_aperturado,
                id_usuario: profesor.id_usuario
            });
        }
    }
);