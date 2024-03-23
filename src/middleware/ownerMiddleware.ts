import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface RequestWithUser extends Request {
    user?: JwtPayload; // Define the user property as optional
}

function ownerMiddleware(TOKEN_SECRET:Secret) {
    return function(req: RequestWithUser, res:Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1] || req.query.token || req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        let userData: JwtPayload;
        try {
            userData = jwt.verify(token, TOKEN_SECRET) as JwtPayload
        }
        catch(err) {
            return res.status(403).send('Access Forbidden')    
        }
        
        if(userData.user_type!=0) {
            return res.status(403).send('Access Forbidden to simple users')    
        }

        let currentTime = Date.now() / 1000;
        let jwtExpireTime = userData['exp'];
        if(jwtExpireTime!==undefined && (jwtExpireTime <= currentTime)) {
            return res.status(403).send('Access Forbidden')    
        }

        req.user = userData
        next()

    }

}

export default ownerMiddleware