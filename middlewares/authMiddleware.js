import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next("Auth failed (authMiddleware)");
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.body.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Auth failed");
  }
};

export default userAuth;
