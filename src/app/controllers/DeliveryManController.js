import User from '../models/User';
import File from '../models/File';

import MessageProducer from '../utils/message';
import ResponseHttpProducer from '../utils/response';

import SchemaValidator from '../validators/DeliveryManSchemaValidator';

class DeliveryManController {
  async index(req, res) {
    const deliveryMen = await User.findAll({
      where: { isDeliveryMan: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });
    return ResponseHttpProducer.done(
      res,
      200,
      MessageProducer.DONE,
      deliveryMen
    );
  }

  async store(req, res) {
    if (!(await SchemaValidator.isValidSchemaToStore(req))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.SCHEMA_VALIDATION_FAILS
      );
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return ResponseHttpProducer.error(res, 400, MessageProducer.USER_EXISTS);
    }
    const userToInsert = req.body;
    userToInsert.isDeliveryMan = true;
    await User.create(userToInsert);
    return ResponseHttpProducer.error(res, 200, MessageProducer.RECORD_CREATED);
  }

  async update(req, res) {
    if (!(await SchemaValidator.isValidSchemaToStore(req))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.SCHEMA_VALIDATION_FAILS
      );
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return ResponseHttpProducer.done(res, 400, MessageProducer.USER_EXISTS);
    }

    const user = await User.findByPk(req.userId);
    const { email } = req.body;

    if (email !== user.email) {
      const userEmailExists = await User.findOne({
        where: { email },
      });

      if (userEmailExists) {
        return ResponseHttpProducer.error(
          res,
          400,
          MessageProducer.EMAIL_EXISTS
        );
      }
    }

    await user.update(req.body);

    return ResponseHttpProducer.done(res, 200, MessageProducer.RECORD_UPDATED);
  }

  async delete(req, res) {
    const userToDelete = await User.findByPk(req.params.id);

    if (!userToDelete) {
      return ResponseHttpProducer.error(
        res,
        401,
        MessageProducer.USER_NOT_FOUND
      );
    }
    await userToDelete.destroy();
    return ResponseHttpProducer.done(res, 200, MessageProducer.RECORD_REMOVED);
  }
}

export default new DeliveryManController();
