import * as Yup from 'yup';

// define schema valid for store user request
export const schemaUserStore = Yup.object().shape({
  name: Yup.string('Campo com formato inválido')
    .required('Campo com preenchimento obrigatório')
    .min(3, 'Campo deve conter no mínimo 3 caracteres')
    .max(100, 'Campo deve conter no máximo 100 caracteres'),
  age: Yup.number()
    .min(1, 'Campo com valor de no minímo de 1')
    .max(200, 'Verifique a idade informada')
    .required('Campo com preenchimento obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo com preenchimento obrigatório'),
  weight: Yup.number()
    .min(1, 'Campo com valor de no minímo de 1')
    .max(1000, 'Verifique o peso informado')
    .required('Campo com preechimento obrigatório'),
  height: Yup.number()
    .min(1, 'Campo com valor de no minímo de 1')
    .max(2.5, 'Verifique a altura informada')
    .required('Campo com preechimento obrigatório'),
});
