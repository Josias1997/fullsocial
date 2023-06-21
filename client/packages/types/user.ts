export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
export interface User {
  id?: number | string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  phone_number?: string;
  gender: Gender;
  birth_date: string;
  profile_image?: string;
  cover_image?: string;
  address?: string;
  city?: string;
  country?: string;
  token: string;
}
