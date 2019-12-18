import * as Yup from 'yup';

// define schema valid for store user request
export const schemaMatriculationStore = Yup.object().shape({
  studentId: Yup.number().required('Campo com preenchimento obrigatório'),
  planId: Yup.number().required('Campo com preechimento obrigatório'),
  startDate: Yup.date('Campo com formato inválido')
    .min(new Date(), 'Data de matrícula inicial inválida')
    .required('Campo com preechimento obrigatório'),
});
