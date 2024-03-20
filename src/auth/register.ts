import { Request, Response } from "express";
function register(req: Request, res: Response) {
    const {username, pass} = req.body

    if(!username || !pass) {
        res.status(404).json({})
        return
    }    
    res.send(username+" "+pass)
    

    // function generateAccessToken(userData) {
    //     return jwt.sign(userData, TOKEN_SECRET, { expiresIn: '2629800s' });
    // }
    // let jwtToken = generateAccessToken()
    // res.send(`JWT TOKEN: ${jwtToken}`)
    
}

export default register