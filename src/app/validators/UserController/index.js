import * as Yup from 'yup';

// define schema valid for store user request
export const schemaUserStore = Yup.object().shape({
  name: Yup.string('Campo com formato inválido')
    .required('Campo com preenchimento obrigatório')
    .min(3, 'Campo deve conter no mínimo 3 caracteres')
    .max(100, 'Campo deve conter no máximo 100 caracteres'),
  password: Yup.string()
    .required('Campo com preenchimento obrigatório')
    .min(6, 'Campo no minímo de 6 caracteres')
    .max(20, 'Campo com preenchimento maximo de 20 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo com preenchimento obrigatório'),
  username: Yup.string()
    .min(6, 'Campo deve conter no mminímo 6 caracteres')
    .max(50, 'Campo com limite de 50 caracteres')
    .required('Campo com preechimento obrigatório'),
});
