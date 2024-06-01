import { Request, Response } from "express";
import crypto from "crypto";
import jwt, { Secret } from "jsonwebtoken";
import UserDbService from "../../prisma/userDbService";

async function login(
  req: Request,
  res: Response,
  JWT_TOKEN_SECRET: Secret | undefined
) {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send("Missing Data");
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
    if (JWT_TOKEN_SECRET === undefined) {
      return res.status(500).send("INTERNAL SERVER ERROR");
    }
    return jwt.sign(userData, JWT_TOKEN_SECRET, { expiresIn: "2629800s" });
  }
  let jwtToken = generateAccessToken(user);
  res.send({ user_found: "1", JWT_TOKEN: jwtToken, user_type: user.user_type });
}

export default login;
