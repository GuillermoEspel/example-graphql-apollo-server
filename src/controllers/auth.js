import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";
import User from "../models/user";

export const login = async (root, args, context) => {
  const { username, password } = args;
  const user = await User.findOne({ username });
  if (!user) throw new UserInputError("Wrong credentials");

  const matchPassword = await User.comparePassword(user.password, password);
  if (!matchPassword) throw new UserInputError("Wrong credentials");

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
};
