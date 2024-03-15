const jwt = require('jsonwebtoken');
function login(req, res, TOKEN_SECRET) {
    
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
module.exports = login