import MessageProducer from './message';

class ResponseHttpProcuder {
  static responseWithMessage(res, httpStatus, message, data) {
    return res.status(httpStatus).json({ message, data });
  }

  static error(res, httpStatus, message) {
    return this.responseWithMessage(
      res,
      httpStatus,
      `${MessageProducer.ERROR}: ${message}`
    );
  }

  static done(res, httpStatus, message, data) {
    return this.responseWithMessage(
      res,
      httpStatus,
      `${MessageProducer.DONE}: ${message}`,
      data
    );
  }
}
export default ResponseHttpProcuder;
