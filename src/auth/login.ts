import { Request, Response } from "express";
import crypto from 'crypto';
import jwt, { Secret } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function chkCredsFromDb() {
    
}

async function login(req: Request, res: Response, TOKEN_SECRET:Secret) {
    const {email, pass} = req.body

    if(!email || !pass) {
        res.status(404).json({})
        return
    }    
    const hashedPass = crypto.createHash('sha256').update(pass).digest('hex');

    const user = await prisma.user.findUnique({
        where: {
            email: email,
            pass: hashedPass,
        },
    })

    if(!user) {
        res.send({"user_found": "0"})
        return
    }
    
    function generateAccessToken(userData: Object) {
        return jwt.sign(userData, TOKEN_SECRET, { expiresIn: '2629800s' });
    }
    let jwtToken = generateAccessToken(user)
    res.send({"user_found": "1", "JWT_TOKEN": jwtToken})

}

export default login