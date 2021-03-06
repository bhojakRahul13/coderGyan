const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    console.log("accessToken",accessToken);
    return { accessToken };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }
}

module.exports = new TokenService();
