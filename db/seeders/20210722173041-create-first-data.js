'use strict';
import data from '../../src/data';
import models from '../../src/models';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            models.Area.bulkCreate(data.areas),
            models.Categoria.bulkCreate(data.categorias),
            models.Modalidad.bulkCreate(data.modalidades),
            models.EstadoCivil.bulkCreate(data.estadosCivil),
            models.Genero.bulkCreate(data.generos),
            models.Usuario.create({
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
            models.Area.destroy({ where: {} }),
            models.Categoria.destroy({ where: {} }),
            models.Modalidad.destroy({ where: {} }),
            models.EstadoCivil.destroy({ where: {} }),
            models.Genero.destroy({ where: {} }),
            models.Usuario.destroy({ where: { dni: '48445894' }})
        ]);
    }
};
