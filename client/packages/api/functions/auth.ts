import { User } from "types";
import axiosInstance from "../config/axiosInstance";

export const login = async (email: string, password: string): Promise<any> => {
  return await axiosInstance.post("/login", { email, password });
};

export const register = async (user: User): Promise<any> => {
  return await axiosInstance.post("/register", user);
};

export const verifyCode = async (code: number, email: string): Promise<any> => {
  return await axiosInstance.post("/verify-code", { code, email });
};

export const sendVerificationCode = async (email: string): Promise<any> => {
  return await axiosInstance.post("/send-verification-code", { email });
};
