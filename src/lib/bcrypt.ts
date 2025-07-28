import bcrypt from "bcryptjs";

const saltRounds = 15;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  userEnteredPassword: string,
  dbPassword: string
) => {
  return await bcrypt.compare(userEnteredPassword, dbPassword);
};
