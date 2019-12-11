import * as Yup from 'yup';

// define schema valid for store user request
export const schemaSessionSignin = Yup.object().shape({
  password: Yup.string()
    .required('Campo com preenchimento obrigatório')
    .min(6, 'Campo no minímo de 6 caracteres')
    .max(20, 'Campo com preenchimento maximo de 20 caracteres'),
  username: Yup.string()
    .min(6, 'Campo deve conter no mminímo 6 caracteres')
    .max(50, 'Campo com limite de 50 caracteres')
    .required('Campo com preechimento obrigatório'),
});
