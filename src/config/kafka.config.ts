import {connectingRequest} from '../lib/consumers';

export const messageConfig = {
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

