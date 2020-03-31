import * as Yup from 'yup';

class LoginSchemaValidator {
  async isValidSchemaToStore(req) {
    return this.schemaToStore().isValid(req.body);
  }

  schemaToStore() {
    return Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
  }
}

export default new LoginSchemaValidator();
