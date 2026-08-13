export const messageConsumersConfig: Record<string, string> = {
    botConnectingRequest: process.env.MESSAGE_TOPIC_AI_CONNECTING_REQUEST ?? "bot.connecting-request",
};

export default messageConsumersConfig;



