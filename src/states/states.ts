import { atom } from 'recoil';

const nameState = atom({
  key: 'loginInfo',
  default: {
    isLogin: false,
    id: '',
    name: '',
  },
});

export { nameState };
