import { get } from '~/core/request';

interface ListInfo {
}

export function getProvinceList(): any  {
  return get('http://5d79e6fe9edf7400140a90cf.mockapi.io/api/findProvinceList');
}

// export function login(data: object) {
//   return post('/scrm/auth/consumer/loginByPhonePwd', data, headersSet('25234234'));
// }
