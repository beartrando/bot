import {RawData} from "ws";
import * as streamingProto from "../../../contracts/proto/streaming";

import logger from "@shared/logger";
import WebsocketClientHandlerInterface from "../interfaces/websocket-client-handler.interface";
import BattleMoveUseCase from "../../../application/use-cases/battle/battle-move";

export class BattleHandler implements WebsocketClientHandlerInterface {
    constructor(
        private readonly battleMoveUseCaae: BattleMoveUseCase,
    ) {
    }

    async handle(data: RawData): Promise<void> {
        try {
            const buffer = new Uint8Array(data as ArrayBuffer);
            const message = streamingProto.BattleResponse.decode(buffer);
            logger.log("📩 Got response:", message);
            await this.battleMoveUseCaae.execute(message);
        } catch (err) {
            logger.error("❌ Failed to parse message:", err);
        }

    }
}

export default BattleHandler;


