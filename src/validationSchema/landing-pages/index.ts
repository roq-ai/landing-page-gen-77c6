import * as yup from 'yup';

export const landingPageValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  date_created: yup.date().required(),
  date_updated: yup.date().required(),
  client_id: yup.string().nullable().required(),
});
