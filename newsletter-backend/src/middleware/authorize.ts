import { NextFunction, Request, Response } from "express";

type AuthorizeOptions = {
  permissions?: string | string[];
  role?: string;
};

export const authorize = ({ permission, role }) => {
  return (req: Request, res: Response, next: NextFunction) => {};
};
