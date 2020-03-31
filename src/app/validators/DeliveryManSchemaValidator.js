import * as Yup from 'yup';

class DeliveryManSchemaValidator {
  async isValidSchemaToStore(req) {
    return this.schemaToStore().isValid(req.body);
  }

  async isValidSchemaToUpdate(req) {
    return this.schemaToUpdate().isValid(req.body);
  }

  schemaToStore() {
    return Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
  }

  schemaToUpdate() {
    return Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });
  }
}

export default new DeliveryManSchemaValidator();
