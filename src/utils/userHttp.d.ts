interface IUserLoginBody {
  username: string;
  password: string;
}

interface IUserUpdateBody {
  password?: string | null;
  email?: string | null;
  avatar?: string | null;
}

interface IUserRegisterBody {
  username: string;
  password: string;
  email: string;
  avatar: string;
}

interface IFetchedCurrentUser {
  id: string;
  username: string;
  iat?: number;
}

interface IFetchedUser {
  isAdmin: boolean;
  username: string;
  email?: string;
  avatar?: string;
  id: string;
}
