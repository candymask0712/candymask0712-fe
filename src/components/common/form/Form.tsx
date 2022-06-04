import { useState } from 'react';
import FormInput from './FormInput';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { nameState } from '../../../states/states';
import { useRouter } from 'next/router';

const initialErrorData: InitialErrorData = {
  id: '',
  pw: '',
};

const initialFormData: InitialFormData = {
  id: '',
  pw: '',
};

type InitialFormData = {
  id: string;
  pw: string;
  [index: string]: string;
};

type InitialErrorData = {
  id: string;
  pw: string;
  [index: string]: string;
};

const Form = () => {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useRecoilState(nameState);
  const [errorData, setErrorData] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialFormData);
  const [allValid, setAllValid] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('/login', {
        username: formData.id,
        password: formData.pw,
      })
      .then(function (response) {
        const { accessToken, user } = response.data.data;
        const userInfo = {
          local_id: user.ID,
          local_name: user.NAME,
          local_accessToken: accessToken,
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        setLoginInfo({
          isLogin: true,
          id: user.ID,
          name: user.NAME,
        });
        router.push('/');
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  return (
    <Container autoComplete='false' onSubmit={handleSubmit}>
      <FormInput
        id={'id'}
        label={'아이디'}
        errorData={errorData}
        formData={formData}
        setErrorData={setErrorData}
        setFormData={setFormData}
        setAllValid={setAllValid}
        inputProps={{
          type: 'text',
          placeholder: '아이디를 입력해주세요.',
        }}
      />
      <FormInput
        id={'pw'}
        label={'비밀번호'}
        errorData={errorData}
        formData={formData}
        setErrorData={setErrorData}
        setFormData={setFormData}
        setAllValid={setAllValid}
        inputProps={{
          type: 'password',
          placeholder: '비밀번호를 입력해주세요',
        }}
      />
      <LoginButton disabled={!allValid} id='submit' type='submit' value='로그인' />
    </Container>
  );
};

export default Form;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const LoginButton = styled.input`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;

const TextTitle = styled.div`
  margin-top: 16px;
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;
