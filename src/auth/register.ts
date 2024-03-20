import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const prisma = new PrismaClient()

async function register(req: Request, res: Response) {
    const {username, pass, email, phone} = req.body

    if(!username || !pass || !email || !phone) {
        res.status(404).json({})
        return
    }    

    const userId = uuidv4()
    const hashedPass = crypto.createHash('sha256').update(pass).digest('hex');

    try {
        const user = await prisma.user.create({
            data: {
            username: username,
            email: email,
            phone: phone,
            pass: hashedPass,
            user_id: userId,
            user_type: "1"
            },
        })
        res.status(201).json({ user });
    }
    catch(err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
    

    
}

export default register