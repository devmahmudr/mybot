import jwt from "jsonwebtoken";

export const tokenHelper = {
  sign: (payload, secretKey, options = {}) => {
    return jwt.sign(payload, secretKey, options);
  },
  verify: (payload, secretKey) => {
    try {
      return jwt.verify(payload, secretKey);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
};
