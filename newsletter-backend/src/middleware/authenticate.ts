import { NextFunction, Request, Response } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //* receive token
  const token = req.headers.authorization?.split(" ")[1];
};
