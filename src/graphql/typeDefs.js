const typeDefs = `
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

  type User {
    username: String!
    friends: [Person]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPersonById(id: ID!): Person
    me: User
  }

  type Mutation {
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    updatePerson(id: ID!, name: String, phone: String, street: String, city: String): Person
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;
export default typeDefs;
