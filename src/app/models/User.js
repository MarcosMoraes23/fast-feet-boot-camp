import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    const attributes = {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      isAdmin: Sequelize.BOOLEAN,
      isDeliveryMan: Sequelize.BOOLEAN,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    };

    super.init(attributes, { sequelize });

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default User;
