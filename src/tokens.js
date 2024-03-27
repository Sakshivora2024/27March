const { sign } = require('jsonwebtoken');

const createAccessToken = (id) =>{
    return sign({id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : '10m',
    })
}

const createRefreshToken = (id) =>{
    return sign({id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : '1d',
    })
}

module.exports = {
    createAccessToken,createRefreshToken,
}