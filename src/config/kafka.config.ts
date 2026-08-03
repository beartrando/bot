import {connectingRequest} from '../lib/consumers';

export const messageConfig = {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['kafka:9092',],
    clientId: process.env.KAFKA_CLIENT_ID ?? 'bot-client',
    groupId: process.env.KAFKA_GROUP_ID ?? 'bot-service',
};

export const messageConsumersConfig: Record<string, ConsumerConfig> = {
    botConnectingRequest: {
        topic:
            process.env.MESSAGE_TOPIC_AI_CONNECTING_REQUEST ??
            "bot.connecting-request",
        handler: connectingRequest,
    },
};

export const messageProducersConfig: Record<string, string> = {};

export default messageConfig;

