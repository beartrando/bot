import {connectingRequest} from '../lib/consumers';

export const kafkaConfig = {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['kafka:9092',],
    clientId: process.env.KAFKA_CLIENT_ID ?? 'ai-client',
    groupId: process.env.KAFKA_GROUP_ID ?? 'ai-service',
};


export const kafkaConsumersConfig = {
    aiConnectingRequest: {
        topic:
            process.env.KAFKA_TOPIC_AI_CONNECTING_REQUEST ??
            "ai.connecting-request",
        handler: connectingRequest,
    },
};

export const kafkaProducersConfig: Record<string, string> = {};

export default kafkaConfig;

