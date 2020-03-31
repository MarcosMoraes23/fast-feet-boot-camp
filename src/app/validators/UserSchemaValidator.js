import * as Yup from 'yup';

class UserSchemaValidator {
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
      password: Yup.string()
        .required()
        .min(6),
    });
  }

  schemaToUpdate() {
    return Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
  }
}

export default new UserSchemaValidator();
