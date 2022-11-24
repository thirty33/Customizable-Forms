import * as yup from 'yup';
import CustomForm from '@containers/CustomForm';
import { LoadingButton } from '@mui/lab';
import { useState, useRef } from 'react';

const GLOBAL_STATE = {
  trinityPerson: 'son',
  suggestion: 'this is a suggestion',
  name: 'joel',
  email: 'joel@test.com',
  age: 18,
  price: 123,
  password: '12345678',
  passwordConfirm: '12345678',
  terms: true,
  isAdmin: false,
  genre: 'female',
  personName: [],
};

const inputList = [
  {
    propName: 'genre',
    label: 'Genre',
    stateValue: 'male',
    type: 'radioGroup',
    optionList: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    xs: 12,
    md: 4,
  },
  {
    propName: 'isAdmin',
    label: 'Is Admin?',
    stateValue: 'isAdmin',
    type: 'switch',
    xs: 12,
    md: 4,
  },
  {
    propName: 'name',
    label: 'Name',
    stateValue: 'name',
    type: 'text',
    otherProps: {},
    xs: 12,
    md: 4,
  },
  {
    propName: 'email',
    label: 'Email',
    stateValue: 'email',
    type: 'text',
    otherProps: {},
    xs: 12,
    md: 4,
  },
  {
    propName: 'age',
    label: 'Age',
    stateValue: 'age',
    type: 'number',
    otherProps: {},
    xs: 12,
    md: 4,
  },
  {
    propName: 'price',
    label: 'Price',
    stateValue: 'price',
    type: 'number',
    otherProps: {},
    xs: 12,
    md: 4,
  },
  {
    propName: 'password',
    label: 'Password',
    stateValue: 'password',
    type: 'password',
    otherProps: {},
    xs: 12,
    md: 4,
  },
  {
    propName: 'passwordConfirm',
    label: 'Confirm Password',
    stateValue: 'passwordConfirm',
    type: 'password',
    otherProps: {},
    xs: 12,
    md: 4,
  },
  {
    propName: 'suggestion',
    label: 'Suggestion',
    stateValue: 'suggestion',
    type: 'text',
    otherProps: {
      multiline: true,
      rows: 4,
    },
    xs: 12,
    md: 4,
  },
  {
    propName: 'trinityPerson',
    label: 'Trinity',
    stateValue: 'trinityPerson',
    optionList: [
      { value: 'father', text: 'Father' },
      { value: 'son', text: 'Son' },
      { value: 'spirit', text: 'Holy Spirit' },
    ],
    type: 'select',
    xs: 12,
    md: 4,
  },
  {
    propName: 'personName',
    label: 'person Names',
    stateValue: 'personName',
    type: 'multiSelect',
    optionList: [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ],
    xs: 12,
    md: 4,
  },
  {
    propName: 'terms',
    label: 'Accept Terms and Conditions',
    stateValue: 'terms',
    type: 'checkbox',
    xs: 12,
    md: 4,
  },
  {
    propName: 'file',
    type: 'file',
    xs: 12,
    md: 4,
  },
];

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const schema = yup
  .object({
    name: yup.string().required('Name is required').max(32),
    email: yup.string().required().email(),
    password: yup.string().required('Password is required').min(8).max(32),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    terms: yup.boolean().oneOf([true], 'You must accept terms and conditions'),
    age: yup.number().positive().integer().required().min(18),
    price: yup
      .string()
      .matches(/^\d+(\.\d{0,2})?$/, 'invalid value')
      .required(),
    trinityPerson: yup.string().required(),
    suggestion: yup.string().required().max(60),
    isAdmin: yup.boolean().required(),
    file: yup.mixed().test('fileType', 'File is required', (files) => {
      const filesCopy = [...files];
      return (
        filesCopy.length == 0 ||
        (filesCopy.length > 0 &&
          filesCopy.every((file) => SUPPORTED_FORMATS.includes(file.type)))
      );
    }),
    genre: yup.string().required(),
    personName: yup
      .array()
      .nullable()
      .test(
        'empty-check',
        'person Names are required',
        (values) =>
          values && values.hasOwnProperty('length') && values.length > 0
      ),
  })
  .required();

function Home(props) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  function handleClick() {
    formRef.current.onHandleSubmit();
  }

  return (
    <>
      <CustomForm
        ref={formRef}
        globalState={GLOBAL_STATE}
        inputList={inputList}
        validationSchema={schema}
      />

      <LoadingButton
        variant="contained"
        fullWidth
        type="button"
        loading={loading}
        sx={{ py: '0.8rem', mt: '1rem' }}
        onClick={handleClick}
      >
        Register
      </LoadingButton>
    </>
  );
}

export default Home;
