import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { CustomCheckbox } from '@components/CustomCheckbox';
import { CustomInput } from '@components/CustomInput';
import { CustomSelect } from '@components/CustomSelect';
import { CustomMultiSelect } from '@components/CustomMultiSelect';
import { CustomSwitch } from '@components/CustomSwitch';
import { CustomFileInput } from '@components/CustomFileInput';
import { CustomRadioGroup } from '@components/CustomRadioGroup';
import { GridWrapper } from '@containers/GridWrapper';

const CustomForm = forwardRef((props, ref) => {
  const { globalState, inputList, validationSchema } = props;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [formStateValues, setFormState] = useState(globalState);

  // handlers
  const handleFormState = (e, property = 'value') => {
    const { [`${property}`]: value } = e.target;

    setFormState({
      ...formStateValues,
      [e.target.name]: value,
    });
  };

  const handleChangeMultiSelect = (event) => {
    const {
      target: { value },
    } = event;

    setFormState({
      ...formStateValues,
      [event.target.name]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // actions
  const onSubmit = (data) => console.log(data);

  const formRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      onHandleSubmit: () => {
        formRef.current.requestSubmit()
      }
    };
  }, []);

  return (
    <FormProvider
      {...{
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
        control,
      }}
    >
      <Box sx={{ maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
          Register
        </Typography>
        <Box
          ref={formRef}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <GridWrapper container spacing={2}>
            {inputList.map((inputInfo) => {
              if (['password', 'text', 'number'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomInput
                      propName={inputInfo.propName}
                      label={inputInfo.label}
                      stateValue={formStateValues[inputInfo.stateValue]}
                      handleFormState={handleFormState}
                      type={inputInfo.type}
                      {...inputInfo.otherProps}
                    />
                  </GridWrapper>
                );
              }
              if (['select'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomSelect
                      propName={inputInfo.propName}
                      label={inputInfo.label}
                      stateValue={formStateValues[inputInfo.stateValue]}
                      handleFormState={handleFormState}
                      optionList={inputInfo.optionList}
                    />
                  </GridWrapper>
                );
              }
              if (['checkbox'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomCheckbox
                      propName={inputInfo.propName}
                      label={inputInfo.label}
                      stateValue={formStateValues[inputInfo.stateValue]}
                      handleFormState={handleFormState}
                    />
                  </GridWrapper>
                );
              }
              if (['switch'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomSwitch
                      propName={inputInfo.propName}
                      label={inputInfo.label}
                      stateValue={formStateValues[inputInfo.stateValue]}
                      handleFormState={handleFormState}
                    />
                  </GridWrapper>
                );
              }
              if (['radioGroup'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomRadioGroup
                      propName={inputInfo.propName}
                      label={inputInfo.label}
                      stateValue={inputInfo.stateValue}
                      optionList={inputInfo.optionList}
                    />
                  </GridWrapper>
                );
              }
              if (['file'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomFileInput propName={'file'} />
                  </GridWrapper>
                );
              }
              if (['multiSelect'].includes(inputInfo.type)) {
                return (
                  <GridWrapper
                    key={inputInfo.propName}
                    item
                    xs={inputInfo.xs}
                    md={inputInfo.md}
                  >
                    <CustomMultiSelect
                      propName={inputInfo.propName}
                      label={inputInfo.label}
                      stateValue={formStateValues[inputInfo.stateValue]}
                      handleFormState={handleChangeMultiSelect}
                      optionList={inputInfo.optionList}
                    />
                  </GridWrapper>
                );
              }
            })}
          </GridWrapper>

          {/* <LoadingButton
            variant="contained"
            fullWidth
            type="submit"
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Register
          </LoadingButton> */}
        </Box>
      </Box>
    </FormProvider>
  );
});
export default CustomForm;
