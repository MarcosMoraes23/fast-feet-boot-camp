import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';
import LoginSchemaValidator from '../validators/LoginSchemaValidator';

import MessageProducer from '../utils/message';
import ResponseHttpProducer from '../utils/response';

class LoginController {
  async store(req, res) {
    if (!(await LoginSchemaValidator.isValidSchemaToStore(req))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.SCHEMA_VALIDATION_FAILS
      );
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return ResponseHttpProducer.error(
        res,
        401,
        MessageProducer.USER_NOT_FOUND
      );
    }

    if (!(await user.checkPassword(password))) {
      return ResponseHttpProducer.error(
        res,
        401,
        MessageProducer.PASSWD_NOT_MATCH
      );
    }

    const { id, name, isAdmin } = user;

    return res.status(200).json({
      message: MessageProducer.LOGIN_SUCCESS,
      userData: { id, name, email, isAdmin },
      token: jwt.sign({ id, email, isAdmin }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new LoginController();
