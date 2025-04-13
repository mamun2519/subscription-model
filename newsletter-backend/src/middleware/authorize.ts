import { NextFunction, Request, Response } from "express";

type AuthorizeOptions = {
  permissions?: string | string[];
  role?: string;
};

export const authorize = ({ permission, role }: AuthorizeOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.pm) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const checkRole = () => {
      if (!role) return true;
      return req.pm?.hasRole(role) ?? false;
    };
  };
};
