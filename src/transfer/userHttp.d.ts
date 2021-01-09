interface IUserLoginBody {
  username?: string;
  password?: string;
}

interface IUserUpdateBody {
  password?: string | null;
  email?: string | null;
  avatar?: string | null;
  currentUser: {
    id: string;
    username: string;
    nick?: string;
    iat?: number;
  };
}

interface IUserRegisterBody {
  username?: string;
  nick?: string;
  password?: string;
  email?: string;
  avatar?: string;
}

interface IFetchedCurrentUser {
  currentUser: {
    id: string;
    username: string;
    nick?: string;
    iat?: number;
  };
}

interface IFetchedUser {
  isAdmin: boolean;
  username: string;
  nick?: string;
  email?: string;
  avatar?: string;
  id: string;
}
