import { Request, Response } from "express";
import crypto from "crypto";
import jwt, { Secret } from "jsonwebtoken";
import UserDbService from "../../prisma/userDbService";

async function login(req: Request, res: Response, TOKEN_SECRET: Secret) {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400);
  }
  const hashedPass = crypto.createHash("sha256").update(pass).digest("hex");

  let user;
  try {
    user = await UserDbService.validateUser(email, hashedPass);
  } catch (err) {
    return res.status(500).send("DB error: " + err);
  }

  if (!user) {
    res.send({ user_found: "0" });
    return;
  }

  function generateAccessToken(userData: Object) {
    return jwt.sign(userData, TOKEN_SECRET, { expiresIn: "2629800s" });
  }
  let jwtToken = generateAccessToken(user);
  res.send({ user_found: "1", JWT_TOKEN: jwtToken, user_type: user.user_type });
}

export default login;
