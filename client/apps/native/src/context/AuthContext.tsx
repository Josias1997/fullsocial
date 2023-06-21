import { createContext } from "react";
import { Gender, User } from "types";

export type ContextUser = User & {
  id: number | string;
};

export const initialUser: ContextUser = {
  id: "",
  first_name: "",
  last_name: "",
  gender: Gender.MALE,
  birth_date: "",
  email: "",
  token: "",
};

const AuthContext = createContext({
  user: initialUser,
  setUser: (user: ContextUser) => {},
});

export default AuthContext;
