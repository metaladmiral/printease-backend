import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface RequestWithUser extends Request {
  user?: JwtPayload; // Define the user property as optional
}

function ownerMiddleware(TOKEN_SECRET: Secret) {
  return function (req: RequestWithUser, res: Response, next: NextFunction) {
    if (req.user === undefined) {
      return res.status(403).send("Access Forbidden");
    }
    if (req.user.user_type != 0) {
      return res.status(403).send("Access Forbidden to simple users");
    }
    next();
  };
}

export default ownerMiddleware;
