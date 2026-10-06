export const jobConsumersConfig = {
    websocketSendEvent: process.env.PG_BOSS_WEBSOCKET_SEND_EVENT ?? 'pg-boss.websocket-send-event',
}

export default jobConsumersConfig;
