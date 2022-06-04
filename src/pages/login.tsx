import Link from 'next/link';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState, createContext, useEffect } from 'react';
import Form from '../components/common/form/Form';
import { useRecoilState } from 'recoil';
import { nameState } from '../states/states';
import { useRouter } from 'next/router';

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

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(nameState);

  useEffect(() => {
    if (loginInfo.id !== '') router.push('/');
  }, []);

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
