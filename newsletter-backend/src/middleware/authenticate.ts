import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { PermissionManager } from "../lib/pm/PermissionManager";
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

  if (!isValidUser) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }

  //* check the permission
  const pm = new PermissionManager({
    roles: [isValidUser],
    permissions: isValidUser.permissions,
  });

  //   assing the user in the req
  req.user = isValidUser;
  req.pm = pm;
  next();
};
