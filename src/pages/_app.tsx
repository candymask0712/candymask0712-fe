import type { AppProps } from 'next/app';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import Header from '../components/common/header/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <RecoilRoot>
          <Header />
          <Component {...pageProps} />
        </RecoilRoot>
      </Content>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
