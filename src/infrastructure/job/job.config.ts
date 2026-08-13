export const jobConfig = {
    max: Number(process.env.PG_BOSS_MAX) ?? 5,
    maintenanceIntervalSeconds: Number(process.env.PG_BOSS_MAINTENANCE_INTERVAL_SECONDS) ?? 60,
    applicationName: process.env.PG_BOSS_APPLICATION_NAME ?? 'bot-pg-boss',
};

export default jobConfig;




// import {sendToStream} from "../lib/consumers";
//
// const pgBossConfig = {
//     max: Number(process.env.PG_BOSS_MAX) ?? 5,
//     maintenanceIntervalSeconds: Number(process.env.PG_BOSS_MAINTENANCE_INTERVAL_SECONDS) ?? 60,
//     applicationName: process.env.PG_BOSS_APPLICATION_NAME ?? 'bot-pg-boss',
// };
//
// export const pgBossConsumersConfig = {
//     websocketSendEvent: {
//         topic: process.env.PG_BOSS_WEBSOCKET_SEND_EVENT ?? 'pg-boss.websocket-send-event',
//         handler: sendToStream
//     },
// }
//
// export default pgBossConfig;
