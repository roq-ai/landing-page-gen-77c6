import * as yup from 'yup';

export const marketingManagerValidationSchema = yup.object().shape({
  date_created: yup.date().required(),
  date_updated: yup.date().required(),
  user_id: yup.string().nullable().required(),
  client_id: yup.string().nullable().required(),
});
