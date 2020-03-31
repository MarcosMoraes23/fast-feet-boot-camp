import MessageProducer from '../utils/message';
import ResponseHttpProducer from '../utils/response';

export default async (req, res, next) => {
  if (!req.isAdmin) {
    ResponseHttpProducer.error(res, 401, MessageProducer.UNAUTHORIZED);
  }
  next();
};
