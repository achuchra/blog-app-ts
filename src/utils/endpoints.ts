export enum ENDPOINTS {
  GET_CURRENT = '/api/users/current',
  GET_ARTICLES = '/api/articles',
  GET_ARTICLE = '/api/articles/',
  ADD_ARTICLE = '/api/articles',
  UPDATE_ARTICLE = '/api/articles/',
  DELETE_ARTICLE = '/api/articles/',
  USER_LOGIN = '/api/user/login',
  USER_UPDATE = '/api/user/update/',
  USER_LOGOUT = '/api/user/logout',
  USER_REGISTER = '/api/user/register',
}

//const with type Values with one of the values from ENDPOINTS properties

// export const ENDPOINTS = {
//   GET_CURRENT: '/api/user/current',
//   GET_ARTICLES: '/api/articles',
//   GET_ARTICLE: '/api/articles/',
//   ADD_ARTICLE: '/api/articles',
//   UPDATE_ARTICLE: '/api/articles/',
//   DELETE_ARTICLE: '/api/articles/',
//   USER_LOGIN: '/api/user/login',
//   USER_UPDATE: '/api/user/update/',
//   USER_LOGOUT: '/api/user/logout',
//   USER_REGISTER: '/api/user/register',
// } as const;

// type Keys = keyof typeof ENDPOINTS;
// type Values = typeof ENDPOINTS[Keys];
