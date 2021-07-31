'use strict';
import models from '../../src/models';
import bcrypt from 'bcrypt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Usuario.create({
      nombre:     'Admin',
      rol:        'ADMIN',
      email:      'admin@admin.com',
      dni:        '--------',
      password:   await bcrypt.hash('123456', 12),
      id_genero:  'masculino',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await models.Usuario.destroy({ where: { email: 'admin@admin.com' }})
  }
};
