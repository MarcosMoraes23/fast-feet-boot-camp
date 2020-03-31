import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    const attributes = {
      name: Sequelize.STRING,
      street: Sequelize.STRING,
      number: Sequelize.INTEGER,
      complement: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
    };

    super.init(attributes, { sequelize });
    return this;
  }
}

export default Recipient;
