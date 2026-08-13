export const messageConfig = {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['kafka:9092',],
    clientId: process.env.KAFKA_CLIENT_ID ?? 'bot-client',
    groupId: process.env.KAFKA_GROUP_ID ?? 'bot-service',
};


export default messageConfig;
