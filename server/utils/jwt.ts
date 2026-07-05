import jwt, { SignOptions, Secret } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as string;
console.log("ACCESS_SECRET =", process.env.JWT_ACCESS_SECRET);
console.log("REFRESH_SECRET =", process.env.JWT_REFRESH_SECRET);

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  } as SignOptions);
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
  } as SignOptions);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
};