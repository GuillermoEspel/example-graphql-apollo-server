import { login } from "../controllers/auth";
import { createUser } from "../controllers/user";
import {
  personCount,
  allPersons,
  findPersonById,
  addPerson,
  updatePerson,
} from "../controllers/person";

const resolvers = {
  Query: {
    personCount,
    allPersons,
    findPersonById,
    me: async (root, args, context) => {
      return context.currentuser;
    },
  },
  Mutation: {
    addPerson,
    updatePerson,
    createUser,
    login,
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
