import { get, post } from '~/core/request';

const headersSet = (jwt: string) => ({
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});

export function getProvinceList(data: object) {
  return get('/scrm/addresslib/findProvinceByProvinceId', data);
}

export function login(data: object) {
  return post('/scrm/auth/consumer/loginByPhonePwd', data, headersSet('25234234'));
}
