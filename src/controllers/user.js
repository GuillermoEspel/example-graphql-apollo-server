import User from "../models/user";

export const createUser = async (root, args, context) => {
  const { username } = args;
  const password = await User.encryptPassword(args.password);
  const user = new User({ username, password });
  return await user.save();
};
