import { ENDPOINTS } from './endpoints';

interface DefaultHeaders extends Record<string, string> {
  'Content-Type': string;
}

const headers: DefaultHeaders = {
  'Content-Type': 'application/json',
};

const httpRequest = async (
  endpoint: string,
  method: string,
  body?: IPossibleArgs,
  config: DefaultHeaders = headers,
): Promise<any> => {
  const res = await fetch(endpoint, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: config || headers,
  });
  return res;
};

export default httpRequest;

const httpMiddleware: IHttpRequest = async (...params) => {
  try {
    const res = await httpRequest(...params);
    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const {
  GET_CURRENT,
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  USER_LOGIN,
  USER_UPDATE,
  USER_LOGOUT,
  USER_REGISTER,
} = ENDPOINTS;

export const http: Http = {
  getCurrent: () => httpMiddleware(GET_CURRENT, 'GET'),
  getArticles: (page = 1) => httpMiddleware(`${GET_ARTICLES}?page=${page}`, 'GET'),
  getArticle: (id) => httpMiddleware(GET_ARTICLE + id, 'GET'),
  addArticle: (body) => httpMiddleware(ADD_ARTICLE, 'POST', body),
  updateArticle: (id, body) => httpMiddleware(`${UPDATE_ARTICLE}${id}`, 'PUT', body),
  deleteArticle: (id) => httpMiddleware(`${DELETE_ARTICLE}${id}`, 'DELETE'),
  userLogin: (body) => httpMiddleware(USER_LOGIN, 'POST', body),
  userUpdate: (id, body) => httpMiddleware(`${USER_UPDATE}${id}`, 'PUT', body),
  userLogout: () => httpMiddleware(USER_LOGOUT, 'GET'),
  userRegister: (body) => httpMiddleware(USER_REGISTER, 'POST', body),
};
