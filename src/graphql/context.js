import { AuthenticationError } from "apollo-server";
import User from "../models/user";
import jwt from "jsonwebtoken";

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
    try {
      const token = auth.substring(7);
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const currentuser = await User.findById(id).populate("friends");
      return { currentuser };
    } catch (error) {
      throw new AuthenticationError("Invalid Token");
    }
  }
};
export default context;
