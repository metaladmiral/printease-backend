import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

/** Custom interface extending Express's Request interface to include user information */
export interface RequestWithUser extends Request {
    user?: JwtPayload; // Define the user property as optional
}