import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 30000,
});

/**
 * Content-Type
 */
function contentType(type: any) {
  switch (type) {
    case 'form':
      return { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };
    case 'json':
      return { 'Content-Type': 'application/json;charset=utf-8' };
    default:
      return {};
  }
}

function request(method: any, url: any, options: any) {
  const defered = service({
    method,
    url,
    data: options.data,
    params: options.params,
    headers: {
      ...options.headers,
      ...contentType(options.type),
    },
  });

  return defered;
}

export function get(url: string, params = {}, options = {}) {
  return new Promise((resolve, reject) => {
    request('GET', url, {
      ...options,
      params,
    })
      .then(response => response.data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.response);
      });
  });
}

export function post(url: string, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    request('POST', url, {
      ...options,
      data,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
}
