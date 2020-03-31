import User from '../models/User';
import UserSchemaValidator from '../validators/UserSchemaValidator';

import MessageProducer from '../utils/message';
import ResponseHttpProducer from '../utils/response';

class UserController {
  async store(req, res) {
    if (!(await UserSchemaValidator.isValidSchemaToStore(req))) {
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

    await User.create(req.body);
    return ResponseHttpProducer.done(res, 200, MessageProducer.RECORD_CREATED);
  }

  async update(req, res) {
    if (!(await UserSchemaValidator.isValidSchemaToUpdate(req))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.SCHEMA_VALIDATION_FAILS
      );
    }

    const user = await User.findByPk(req.userId);
    const { email, oldPassword } = req.body;

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return ResponseHttpProducer.error(
          res,
          400,
          MessageProducer.EMAIL_EXISTS
        );
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.PASSWD_NOT_MATCH
      );
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
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

export default new UserController();
