import jwt from "jsonwebtoken";

export const RegisterUser = (userData) => {
    console.log(userData)
    const token = jwt.sign(userData, 'shhhh');
        return token;
}
