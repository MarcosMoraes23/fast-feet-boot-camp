import * as Yup from 'yup';

class OrderSchemaValidator {
  async isValidSchemaToStore(req) {
    return this.schemaToStore().isValid(req.body);
  }

  async isValidSchemaToUpdate(req) {
    return this.schemaToUpdate().isValid(req.body);
  }

  schemaToStore() {
    return Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      productName: Yup.string().required(),
      startDate: Yup.date().required(),
    });
  }

  schemaToUpdate() {
    return Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });
  }
}

export default new OrderSchemaValidator();
