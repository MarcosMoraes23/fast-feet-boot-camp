import * as Yup from 'yup';

class RecipientSchemaValidator {
  async isValidSchemaToStore(req) {
    return this.schemaToStore().isValid(req.body);
  }

  schemaToStore() {
    return Yup.object().shape({
      name: Yup.string()
        .required()
        .max(255),
      street: Yup.string()
        .required()
        .max(255),
      number: Yup.number()
        .required()
        .max(255),
      complement: Yup.string()
        .required()
        .max(255),
      state: Yup.string()
        .required()
        .max(255),
      city: Yup.string()
        .required()
        .max(255),
    });
  }
}

export default new RecipientSchemaValidator();
