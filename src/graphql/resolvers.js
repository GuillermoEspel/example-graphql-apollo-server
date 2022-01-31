import { UserInputError } from "apollo-server";
import { v1 as uuid } from "uuid";

const persons = [
  {
    name: "Midu",
    phone: "034-1234567",
    street: "Calle Frontend",
    city: "Barcelona",
    id: "100",
  },
  {
    name: "Youseff",
    phone: "044-1234567",
    street: "Calle Fullstack",
    city: "Mataro",
    id: "101",
  },
  {
    name: "Itzi",
    street: "Calle Testing",
    city: "Ibiza",
    id: "102",
  },
];
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) return persons;
      return persons.filter((o) => (args.phone == "YES" ? o.phone : !o.phone));
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((o) => o.name == name);
    },
    findPersonById: (root, args) => {
      const person = persons.find((o) => o.id == args.id);
      if (!person) return null;
      return person;
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((o) => o.name == args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    updatePerson: (root, args) => {
      const personIndex = persons.findIndex((o) => o.id == args.id);
      if (personIndex == -1) return null;
      const person = persons[personIndex];
      const updatePerson = { ...person, ...args };
      persons[personIndex] = updatePerson;
      return updatePerson;
    },
    editPhone: (root, args) => {
      const personIndex = persons.findIndex((o) => o.name == args.name);
      if (personIndex == -1) return null;
      const person = persons[personIndex];
      const updatePerson = { ...person, phone: args.phone };
      persons[personIndex] = updatePerson;
      return updatePerson;
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
