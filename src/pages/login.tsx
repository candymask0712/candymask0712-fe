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
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <Mock>login</Mock>
        </Link>
      </Header>
      <Form />
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Mock = styled.div``;
