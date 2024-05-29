import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import UserDbService from "../../prisma/userDbService";

async function register(req: Request, res: Response) {
  const { username, pass, email, phone } = req.body;

  if (!username || !pass || !email || !phone) {
    res.status(404).json({});
    return;
  }

  const userId = uuidv4();
  const hashedPass = crypto.createHash("sha256").update(pass).digest("hex");

  try {
    const user = await UserDbService.createUser(
      username,
      email,
      phone,
      hashedPass,
      userId
    );
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export default register;
