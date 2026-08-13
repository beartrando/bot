import {connectToBattle} from "../services/battle.service";
import logger from "@shared/logger";
import * as streamingProto from "../grpc/generated/streaming";
import battleClient from "../clients/battle.client";



export async function sendToStream(message: streamingProto.BattleRequest): Promise<void> {
    logger.log('sendToStream');
    console.log(message);

    try {
        await battleClient.send(message);
    } catch (error) {
        logger.error(`[Websocket] Failed to process message`, {
            rawValue: message,
            error,
        });
        throw error; // чтобы PgBoss сделал retry
    }

}
