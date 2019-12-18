import * as Yup from 'yup';

// define schema valid for store user request
export const schemaPlanStore = Yup.object().shape({
  title: Yup.string().required('Campo com preenchimento obrigatório'),
  duration: Yup.number()
    .min(3, 'Planos devem conter no mínimo 3 meses')
    .required('Campo com preechimento obrigatório'),
  price_monthly: Yup.number()
    .required('Campo com preenchimento obrigatório')
    .min(19.9, 'Planos não podem ter valores abaixo de R$19,90'),
});

export const schemaPlanUpdate = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number().min(3, 'Planos devem conter no mínimo 3 meses'),
  price_monthly: Yup.number().min(
    19.9,
    'Planos não podem ter valores abaixo de R$19,90'
  ),
});
