module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'is_delivery_man', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 'false',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'is_delivery_man');
  },
};
