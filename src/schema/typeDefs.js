import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    notifications: [Notification]
  }

  type Notification {
    label: String
  }

  type Mutation {
    createNotification(label: String): Notification
  }

  type Subscription {
    newNotification: Notification
  }
`;
