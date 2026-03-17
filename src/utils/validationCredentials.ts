const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

export const validateCredentials = (
  email: string,
  password: string,
) : void => {
  if (!email || !password) throw new Error("Email and password are required");
  if (!emailRegex.test(email))throw new Error("Invalid email format");
  if (!passwordRegex.test(password))throw new Error(
      "Password must be at least 6 characters long and contain at least one uppercase letter and one number",
    );
};
