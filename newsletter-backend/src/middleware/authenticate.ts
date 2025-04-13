import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
const SECRET_TOKEN = "Hero";
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //* receive token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  //* verify token using jwt
  const isValidUser = jwt.verify(token, SECRET_TOKEN);
};
