import { Response } from "express";
import { RequestWithUser } from "../../types";
import UserDbService from "../../prisma/userDbService";

async function updateUserDetails(req: RequestWithUser, res: Response) {
  const { pushtokens: pushTokens, userid: userId } = req.body;

  if (!pushTokens || !userId) {
    res.status(400).json({});
    return;
  }

  try {
    await UserDbService.updateUser(userId, pushTokens);
    return res.status(200).json({ success: "true" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update user" });
  }
}

export default updateUserDetails;
