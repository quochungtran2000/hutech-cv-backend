import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  try {
    req.user = undefined;
    let token = req.headers["authorization"] || req.query.token;
    if (!token?.includes("Bearer")) {
      console.log("Anonymous");
      return next();
    }
    token = token.replace("Bearer ", "");
    const user = jwt.verify(token, "hung");
    console.log(`user`, user);
    req.user = user;
    return next();
  } catch (err) {
    return next();
  }
};
