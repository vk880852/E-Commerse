import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authuser = async (req, res, next) => {
  try {
    //let accesstoken = req.cookies?.accesstoken || (req.header("Authorization")?.replace("Bearer ", ""));
    let accesstoken=req.headers?.authorization?.replace("Bearer ","")||req.cookies.accesstoken;
    if (!accesstoken) {
      return res.status(401).json({ error: "Unauthorized: Access token is missing" });
    }
    const decodedToken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY);
    console.log(decodedToken);
    const existuser = await User.findById(decodedToken._id).select("-password -refreshtoken");
    if (!existuser) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    req.user = existuser;
    next();
  } catch (error) {
    console.error(`Error occurred during authentication: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { authuser };
