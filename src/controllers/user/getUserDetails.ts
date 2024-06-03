import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../../types";
import UserDbService from "../../prisma/userDbService";

async function getUserDetails(
  req: RequestWithUser,
  res: Response,
  isUserIdProvided?: boolean
) {
  if (!isUserIdProvided) {
    if (req.user === undefined) {
      res.status(403).send("Access Forbidden!");
      return;
    }
    return res.send(req.user);
  }

  if (!req.query.userid) {
    return res
      .status(400)
      .send({ success: false, msg: "No User ID query param found!" });
  }

  const userIdFromUrl = req.query.userid.toString();

  try {
    const userDetails = await UserDbService.getUserDetails(userIdFromUrl);
    return res.status(200).json({ success: "true", data: userDetails });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update user" });
  }
}

export default getUserDetails;
