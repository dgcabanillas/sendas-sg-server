'use strict';
import data from '../../src/data';
import models from '../../src/models';
import bcrypt from 'bcrypt';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            await models.Area.bulkCreate(data.areas),
            await models.Categoria.bulkCreate(data.categorias),
            await models.Modalidad.bulkCreate(data.modalidades),
            await models.EstadoCivil.bulkCreate(data.estadosCivil),
            await models.Genero.bulkCreate(data.generos),
            await models.Usuario.create({
                nombre:     'Diego',
                apellido:   'Cabanillas',
                rol:        'ADMIN',
                email:      'dg.cabanillas@uni.pe',
                dni:        '48445894',
                password:   await bcrypt.hash('123456', 12),
                id_genero:  'masculino',
            })
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            await models.Area.destroy({ where: {} }),
            await models.Categoria.destroy({ where: {} }),
            await models.Modalidad.destroy({ where: {} }),
            await models.EstadoCivil.destroy({ where: {} }),
            await models.Genero.destroy({ where: {} }),
            await models.Usuario.destroy({ where: { dni: '48445894' }})
        ]);
    }
};
