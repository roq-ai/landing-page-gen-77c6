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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getContentCreatorById, updateContentCreatorById } from 'apiSdk/content-creators';
import { contentCreatorValidationSchema } from 'validationSchema/content-creators';
import { ContentCreatorInterface } from 'interfaces/content-creator';
import { UserInterface } from 'interfaces/user';
import { ClientInterface } from 'interfaces/client';
import { getUsers } from 'apiSdk/users';
import { getClients } from 'apiSdk/clients';

function ContentCreatorEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ContentCreatorInterface>(
    () => (id ? `/content-creators/${id}` : null),
    () => getContentCreatorById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ContentCreatorInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateContentCreatorById(id, values);
      mutate(updated);
      resetForm();
      router.push('/content-creators');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ContentCreatorInterface>({
    initialValues: data,
    validationSchema: contentCreatorValidationSchema,
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
              label: 'Content Creators',
              link: '/content-creators',
            },
            {
              label: 'Update Content Creator',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Content Creator
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
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
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
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
              onClick={() => router.push('/content-creators')}
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
    entity: 'content_creator',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ContentCreatorEditPage);