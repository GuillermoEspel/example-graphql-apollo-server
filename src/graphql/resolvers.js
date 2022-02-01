import { UserInputError } from "apollo-server";
import Person from "../models/person";

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      return await Person.find();
    },
    findPersonById: async (root, args) => {
      try {
        const person = await Person.findById(args.id);
        if (!person) return null;
        return person;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Mutation: {
    addPerson: async (root, args) => {
      try {
        const person = new Person({ ...args });
        return await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    updatePerson: async (root, args) => {
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
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};
export default resolvers;
