import { useEffect, useRef, useContext } from 'react';
import { FormContext } from '../../../pages/login';
import styled from 'styled-components';

const ID_REGEX = new RegExp('^[a-zA-Z0-9]{5,30}$');
const PW_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$');

const ERROR_MSG: ERROR_MSG_Type = {
  // required: '필수 정보입니다.',
  invalidId: '올바른 아이디 형식으로 입력해주세요',
  invalidPw: '올바른 비밀번호 형식으로 입력해주세요',
};

type ERROR_MSG_Type = {
  // required: string;
  invalidId: string;
  invalidPw: string;
  [index: string]: string;
};

const FormInput = ({
  id,
  label,
  inputProps,
  errorData,
  setErrorData,
  formData,
  setFormData,
  setAllValid,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const checkRegex = (inputId: string, e: any) => {
    let result: string | boolean;
    // const value: string = formData[inputId];
    const value: string = e.target.value;
    const actionType = e._reactName;

    if (actionType === 'onChange') {
      switch (inputId) {
        case 'id':
          result = ID_REGEX.test(value) && true;
          // console.log('actionType-result', result, 'inputId', value);
          break;
        case 'pw':
          result = PW_REGEX.test(value) && true;
          break;
        default:
          return;
      }
    }

    if (actionType === 'onBlur') {
      switch (inputId) {
        case 'id':
          result = ID_REGEX.test(value) ? true : 'invalidId';
          break;
        case 'pw':
          result = PW_REGEX.test(value) ? true : 'invalidPw';
          break;
        default:
          return;
      }
    }
    setErrorData((prev: any) => ({ ...prev, [inputId]: result }));
  };

  useEffect(() => {
    if (id === 'id') {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    // console.log('formData', formData);
    // console.log('Object.values(errorData)', Object.values(errorData));
    const inputStatus = Object.values(errorData).every((value: any) => value === true);
    setAllValid(inputStatus);
  }, [formData]);

  return (
    <>
      <TextLabel htmlFor={id}>{label}</TextLabel>
      <TextInput
        id={id}
        ref={inputRef}
        value={formData[id]}
        onChange={(e: any) => {
          setFormData((prev: any) => ({ ...prev, [id]: e.target.value }));
          checkRegex(id, e);
        }}
        onBlur={(e) => checkRegex(id, e)}
        {...inputProps}
      />
      <ErrorMsg>{errorData[id] !== true ? ERROR_MSG[errorData[id]] : ''}</ErrorMsg>
    </>
  );
};

export default FormInput;

const TextLabel = styled.label``;

const TextInput = styled.input`
  border: 1px solid #000;
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
`;

const ErrorMsg = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
