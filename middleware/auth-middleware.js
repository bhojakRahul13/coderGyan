const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const accessToken = req.header("x-auth-token");
    console.log("accessToken", accessToken);
    //Check if not token

    if (!accessToken) {
      return res.status(401).json({ msg: "No token ,authorized" });
    }

    const userData = await tokenService.verifyAccessToken(accessToken);
    if (!userData) {
      throw new Error();
    }
    req.user = userData;
    console.log("token", userData);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
