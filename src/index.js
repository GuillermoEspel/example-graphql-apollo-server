import "dotenv/config";
import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import context from "./graphql/context.js";
import "./db.js";

const server = new ApolloServer({ typeDefs, resolvers, context });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
