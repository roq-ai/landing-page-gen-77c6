import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createLandingPage } from 'apiSdk/landing-pages';
import { landingPageValidationSchema } from 'validationSchema/landing-pages';
import { ClientInterface } from 'interfaces/client';
import { getClients } from 'apiSdk/clients';
import { LandingPageInterface } from 'interfaces/landing-page';

function LandingPageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LandingPageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLandingPage(values);
      resetForm();
      router.push('/landing-pages');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LandingPageInterface>({
    initialValues: {
      title: '',
      content: '',
      date_created: new Date(new Date().toDateString()),
      date_updated: new Date(new Date().toDateString()),
      client_id: (router.query.client_id as string) ?? null,
    },
    validationSchema: landingPageValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Landing Pages',
              link: '/landing-pages',
            },
            {
              label: 'Create Landing Page',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Landing Page
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.content}
            label={'Content'}
            props={{
              name: 'content',
              placeholder: 'Content',
              value: formik.values?.content,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_created" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Created
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_created ? new Date(formik.values?.date_created) : null}
              onChange={(value: Date) => formik.setFieldValue('date_created', value)}
            />
          </FormControl>
          <FormControl id="date_updated" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Updated
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_updated ? new Date(formik.values?.date_updated) : null}
              onChange={(value: Date) => formik.setFieldValue('date_updated', value)}
            />
          </FormControl>
          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/landing-pages')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'landing_page',
    operation: AccessOperationEnum.CREATE,
  }),
)(LandingPageCreatePage);
