import { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

const ID_REGEX = new RegExp('^[a-zA-Z0-9]{5,30}$');
const PW_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$');

const ERROR_MSG: ERROR_MSG_Type = {
  invalidId: '올바른 아이디 형식으로 입력해주세요',
  invalidPw: '올바른 비밀번호 형식으로 입력해주세요',
};

type ERROR_MSG_Type = {
  invalidId: string;
  invalidPw: string;
  [index: string]: string;
};

type InitialErrorData = {
  id: string;
  pw: string;
  [index: string]: string;
};

type InitialFormData = {
  id: string;
  pw: string;
  [index: string]: string;
};

interface FormInputProps {
  id: string;
  label: string;
  errorData: InitialErrorData;
  setErrorData: any;
  formData: InitialFormData;
  setFormData: any;
  setAllValid: any;
  inputProps: {
    type: string;
    placeholder: string;
    [index: string]: string | boolean;
  };
}

const FormInput = ({
  id,
  label,
  inputProps,
  errorData,
  setErrorData,
  formData,
  setFormData,
  setAllValid,
}: FormInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const checkRegex = (inputId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    let result: string | boolean;
    const value: string = e.target.value;
    const actionType = e.type;

    if (actionType === 'change') {
      switch (inputId) {
        case 'id':
          result = ID_REGEX.test(value) && 'true';
          break;
        case 'pw':
          result = PW_REGEX.test(value) && 'true';
          break;
        default:
          return;
      }
    }

    if (actionType === 'blur') {
      switch (inputId) {
        case 'id':
          result = ID_REGEX.test(value) ? 'true' : 'invalidId';
          break;
        case 'pw':
          result = PW_REGEX.test(value) ? 'true' : 'invalidPw';
          break;
        default:
          return;
      }
    }

    setErrorData((prev: {}) => ({ ...prev, [inputId]: result }));
  };

  useEffect(() => {
    if (id === 'id') {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const inputStatus = Object.values(errorData).every((value) => {
      return value === 'true';
    });
    setAllValid(inputStatus);
  }, [formData]);

  return (
    <>
      <TextLabel htmlFor={id}>{label}</TextLabel>
      <TextInput
        id={id}
        ref={inputRef}
        value={formData[id]}
        onChange={(e) => {
          setFormData((prev: {}) => ({ ...prev, [id]: e.target.value }));
          checkRegex(id, e);
        }}
        onBlur={(e) => checkRegex(id, e)}
        autoComplete='false'
        {...inputProps}
      />
      <ErrorMsg>{errorData[id] !== 'true' ? ERROR_MSG[errorData[id]] : ''}</ErrorMsg>
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
