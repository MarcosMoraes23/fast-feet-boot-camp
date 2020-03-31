import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    const attributes = {
      productName: Sequelize.STRING,
      canceledAt: Sequelize.DATE,
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
    };

    super.init(attributes, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.User, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}

export default Order;
