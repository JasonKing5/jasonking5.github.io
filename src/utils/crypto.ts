import CryptoJS from 'crypto-js';

export const encryptPassword = (password: string): string => {
  return CryptoJS.MD5(password).toString();
};

export const encryptPasswordWithSalt = (password: string): string => {
  // You can add a salt to make it more secure
  const salt = "your-secret-salt";
  return CryptoJS.MD5(password + salt).toString();
};
