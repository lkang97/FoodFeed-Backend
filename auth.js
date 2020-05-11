const bearerToken = require("express-bearer-token");
const jwt = require("jsonwebtoken");

const { jwtConfig } = require("./config");
const { User } = require("./db/models");

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );
  return token;
};

const restoreUser = (req, res, next) => {
  // token being parsed from request header by the bearerToken middleware
  // function in app.js:
  const { token } = req;

  if (!token) {
    //if there is no token should return 401
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      e.status = 401;
      return next(e);
    }

    if (!req.user) {
      // Send a "401 Unauthorized" response status code
      // along with an "WWW-Authenticate" header value of "Bearer".
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};
const requireAuth = [bearerToken(), restoreUser];
module.exports = { getUserToken, requireAuth };
