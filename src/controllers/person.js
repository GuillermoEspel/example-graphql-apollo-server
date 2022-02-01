import { UserInputError } from "apollo-server";
import Person from "../models/person";

export const personCount = (root, args, context) => {
  return Person.collection.countDocuments();
};

export const allPersons = async (root, args, context) => {
  return await Person.find();
};

export const findPersonById = async (root, args, context) => {
  try {
    const person = await Person.findById(args.id);
    if (!person) return null;
    return person;
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};

export const addPerson = async (root, args, context) => {
  try {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError("Not Authenticated");

    const person = new Person({ ...args });
    await person.save();
    currentUser.friends = currentUser.friends.concat(person);
    await currentUser.save();
    return person;
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};

export const updatePerson = async (root, args, context) => {
  try {
    const person = await Person.findById(args.id);
    if (!person) return null;
    person.name = args.name || person.name;
    person.phone = args.phone || person.phone;
    person.street = args.street || person.street;
    person.city = args.city || person.city;
    return await person.save();
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};
