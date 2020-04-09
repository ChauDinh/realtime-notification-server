import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers/resolvers";

const app = express();

app.use(cors("*"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/subscriptions",
  },
});
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(`🤡  Server ready at http://localhost:400${server.graphqlPath}`);

  console.log(
    `🎉  Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
  );
});
