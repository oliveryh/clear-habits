'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Entry', 'description', {
      type: DataTypes.STRING,
      defaultValue: null,
    })

    await queryInterface.addColumn('Task', 'complete', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
