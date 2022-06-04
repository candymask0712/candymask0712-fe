import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { nameState } from '../../../states/states';
import axios from 'axios';

const Header = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(nameState);

  const id = loginInfo.id;

  let location: string = '';
  if (typeof window !== 'undefined') {
    location = window.location.href;
  }

  useEffect(() => {
    if (id === '' && localStorage.getItem('userInfo') != null) {
      const local_loginInfo = JSON.parse(localStorage.getItem('userInfo') + '');
      const { local_id, local_name, local_accessToken } = local_loginInfo;

      axios
        .get(`/users/${local_id}`, {})
        .then(function (response) {
          const data = response.data.data;
          setLoginInfo({
            isLogin: true,
            id: data.user.ID,
            name: data.user.NAME,
          });
        })
        .catch(function (error) {
          console.log('error', error);
        });
    } else {
    }
  }, [loginInfo, location]);

  useEffect(() => {});

  const BeforeLoginScreen = () => (
    <Link href='/login'>
      <TitleH3>login</TitleH3>
    </Link>
  );

  const logout = () => {
    setLoginInfo({ isLogin: false, id: '', name: '' });
    localStorage.removeItem('userInfo');
  };

  const AfterLoginScreen = () => (
    <InfoContainer>
      <LoginStatus>{loginInfo.name}</LoginStatus>
      <LoginStatus onClick={logout}>logout</LoginStatus>
    </InfoContainer>
  );

  return (
    <Container>
      <Link href='/'>
        <TitleH1>HAUS</TitleH1>
      </Link>
      {loginInfo.isLogin ? <AfterLoginScreen /> : <BeforeLoginScreen />}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TitleH1 = styled.h1`
  font-size: 48px;
`;
const TitleH3 = styled.h3``;

const LoginStatus = styled.span`
  text-align: right;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
