import { BadRequest } from "../errors/index.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

export const validateCredentials = (
  email: string,
  password: string,
) : void => {
  if (!email || !password) throw BadRequest("Email and password are required");
  if (!emailRegex.test(email)) throw BadRequest("Invalid email format");
  if (!passwordRegex.test(password)) throw BadRequest(
      "Password must be at least 6 characters long and contain at least one uppercase letter and one number",
    );
};
