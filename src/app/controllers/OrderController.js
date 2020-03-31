import Order from '../models/Order';

import OrderSchemaValidator from '../validators/OrderSchemaValidator';

import MessageProducer from '../utils/message';
import ResponseHttpProducer from '../utils/response';

class OrderController {
  async store(req, res) {
    if (!req.isAdmin) {
      return ResponseHttpProducer.error(res, 401, MessageProducer.UNAUTHORIZED);
    }

    if (!(await OrderSchemaValidator.isValidSchemaToStore(req))) {
      return ResponseHttpProducer.error(
        res,
        400,
        MessageProducer.SCHEMA_VALIDATION_FAILS
      );
    }

    await Order.create(req.body);
    return ResponseHttpProducer.done(res, 200, MessageProducer.RECORD_CREATED);
  }
}

export default new OrderController();
