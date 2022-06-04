import Link from 'next/link';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState, createContext } from 'react';
import Form from '../components/common/form/Form';

const initialFormData: InitialFormDataType = {
  id: '',
  pw: '',
  confirmPw: '',
};

type InitialFormDataType = {
  id: string;
  pw: string;
  confirmPw: string;
  [index: string]: string;
};

export const FormContext = createContext({
  formData: initialFormData,
  setFormData: () => {},
});

const LoginPage: NextPage = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default LoginPage;

const TitleH1 = styled.h1`
  font-size: 48px;
`;

const TitleH3 = styled.h3``;
