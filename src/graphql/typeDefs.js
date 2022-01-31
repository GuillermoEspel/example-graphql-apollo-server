const typeDefs = `
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
    findPersonById(id: ID!): Person
  }

  type Mutation {
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    updatePerson(id: ID!, name: String, phone: String, street: String, city: String): Person
    editPhone(name: String!, phone: String!): Person
  }
`;
export default typeDefs;
