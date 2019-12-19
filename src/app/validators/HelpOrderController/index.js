import * as Yup from 'yup';

// define schema valid for store user request
export const schemaHelpOrderStore = Yup.object().shape({
  answer: Yup.string()
    .min(10, 'Campo com preenchimento minímo de 10 caracteres')
    .required('Campo com preenchimento obrigatório'),
});
