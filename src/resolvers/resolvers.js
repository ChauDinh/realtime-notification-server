import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
let notifications = [];
const NOTIFICATION_SUBSCRIPTION_TOPIC = "newNotifications";

export const resolvers = {
  Query: {
    notifications: () => notifications,
  },
  Mutation: {
    createNotification: (_, args) => {
      const newNotification = {
        label: args.label,
      };
      notifications.push(newNotification);

      pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
        newNotification,
      });
      return newNotification;
    },
  },
  Subscription: {
    newNotification: {
      subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC),
    },
  },
};
