const bcryptjs = require('bcryptjs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'tb_users',
      [
        {
          name: 'Administrador',
          username: 'admin@',
          email: 'admin@gympoint.com',
          password: bcryptjs.hashSync('admin123456', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('tb_users', null, {}),
};
