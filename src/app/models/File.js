import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    const attributes = {
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3333/files/${this.path}`;
        },
      },
    };

    super.init(attributes, { sequelize });
    return this;
  }
}

export default File;
