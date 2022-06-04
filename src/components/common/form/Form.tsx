import { useState } from 'react';
import FormInput from './FormInput';
import styled from 'styled-components';
import axios from 'axios';

const initialErrorData = {
  id: '',
  pw: '',
};

const initialFormData: InitialFormDataType = {
  id: '',
  pw: '',
};

type InitialFormDataType = {
  id: string;
  pw: string;
  [index: string]: string;
};

const Form = () => {
  const [errorData, setErrorData] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialFormData);
  const [allValid, setAllValid] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post('/login', {
        username: formData.id,
        password: formData.pw,
      })
      .then(function (response) {
        // console.log('response', response);
        console.log('response.data.data', response.data.data);
      })
      .catch(function (error) {
        console.log('error', error);
      })
      .then(function () {
        // 항상 실행
      });

    // async await 함수를 사용할 때,

    // try {
    //   const data = await axios.post('url');
    // } catch {
    //   // 오류 발생시 실행
    // }
  };

  return (
    <Container autoComplete={'off'} onSubmit={handleSubmit}>
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
          autoFocus: true,
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
          autoComplete: 'off',
        }}
      />
      <LoginButton disabled={!allValid} id='submit' type='submit' value='가입하기' />
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
