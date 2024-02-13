const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  InternalServerError,
} = require("../../errors");

const pathToKey = path.join(__dirname, "../..", "id_rsa_priv.pem");
const pathToPubKey = path.join(__dirname, "../..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");



function issueJWT(user) {
  const _id = user._id;

  const expiresIn = process.env.EXPIRES_IN;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign({payload: payload}, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

function authMiddleware(req, res, next) {
  // console.log("backend recived",req.headers.authorization) ;
  let tokenParts;
  if (req.headers.authorization){
    tokenParts = req.headers.authorization.split(" ");
  }else{
    throw new UnauthenticatedError('You are not authorized to visit this route. Try Login first!')
  }

  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      req.jwt = verification;
      next();
    } catch (err) {
      // console.log(err)
      throw new UnauthenticatedError('You are not authorized to visit this route. Try Login first!')
    }
  } else {
    throw new UnauthenticatedError('You are not authorized to visit this route. Try Login first!')
  }
}


module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
