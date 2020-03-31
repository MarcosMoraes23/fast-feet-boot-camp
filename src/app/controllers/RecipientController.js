import Recipient from '../models/Recipient';
import RecipientSchemaValidator from '../validators/RecipientSchemaValidator';

import MessageProducer from '../utils/message';
import ResponseHttpProducer from '../utils/response';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    return ResponseHttpProducer.done(
      res,
      200,
      MessageProducer.DONE,
      recipients
    );
  }

  async store(req, res) {
    if (!req.isAdmin) {
      return ResponseHttpProducer.error(res, 401, MessageProducer.UNAUTHORIZED);
    }

    if (!(await RecipientSchemaValidator.isValidSchemaToStore(req))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.SCHEMA_VALIDATION_FAILS
      );
    }
    await Recipient.create(req.body);
    return ResponseHttpProducer.done(res, 200, MessageProducer.RECORD_CREATED);
  }
}

export default new RecipientController();
