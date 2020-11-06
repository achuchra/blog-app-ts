import { endpoints } from './endpoints';

interface DefaultHeaders extends Record<string, string> {
  'Content-Type': string;
}

const headers: DefaultHeaders = {
  'Content-Type': 'application/json',
};

const httpRequest = async (endpoint: string, method: string, body?: any | null, config: DefaultHeaders = headers) => {
  const res = await fetch(endpoint, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: config || headers,
  });
  return res;
};

export default httpRequest;

const httpMiddleware = async <T>(...params: Parameters<typeof httpRequest>): Promise<T> => {
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
} = endpoints;

type Optionals = {
  id?: number | string;
  body?: any;
};
// : Record<string, ({ id, body }: Optionals) => ReturnType<typeof httpMiddleware>> =
export const http: Record<string, ({ id, body }: Optionals) => ReturnType<typeof httpMiddleware>> | null = {
  getCurrent: () => httpMiddleware(GET_CURRENT, 'GET'),
  getArticles: () => httpMiddleware(GET_ARTICLES, 'GET'),
  getArticle: ({ id }) => httpMiddleware(GET_ARTICLE + id, 'GET'),
  addArticle: ({ body }) => httpMiddleware(ADD_ARTICLE, 'POST', body),
  updateArticle: ({ id, body }) => httpMiddleware(`${UPDATE_ARTICLE}${id}`, 'PUT', body),
  deleteArticle: ({ id }) => httpMiddleware(`${DELETE_ARTICLE}${id}`, 'DELETE'),
  userLogin: ({ body }) => httpMiddleware(USER_LOGIN, 'POST', body),
  userUpdate: ({ id, body }) => httpMiddleware(`${USER_UPDATE}${id}`, 'PUT', body),
  userLogout: () => httpMiddleware(USER_LOGOUT, 'POST'),
  userRegister: ({ body }) => httpMiddleware(USER_REGISTER, 'POST', body),
};
