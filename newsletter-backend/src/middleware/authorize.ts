import { NextFunction, Request, Response } from "express";

type AuthorizeOptions = {
  permissions?: string | string[];
  role?: string;
};

//* middleware factory
export const authorize = ({ permissions, role }: AuthorizeOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //  if not pm retune 401
    if (!req.pm) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    //* check the user role
    const checkRole = () => {
      if (!role) return true;
      return req.pm?.hasRole(role) ?? false;
    };

    //* check the user permission
    const checkPermissions = () => {
      if (!permissions) return true;
      if (Array.isArray(permissions)) {
        return req.pm?.hasPermissions(permissions) ?? false;
      }
      return req.pm?.hasPermission(permissions) ?? false;
    };

    //* check permission and role
    const hasAccess = checkRole() && checkPermissions();

    if (hasAccess) {
      next();
      return;
    }

    res.status(403).json({
      message: "Forbidden",
    });
  };
};
