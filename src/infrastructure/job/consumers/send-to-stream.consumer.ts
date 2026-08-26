import logger from "@shared/logger";
import * as streamingProto from "../../../contracts/proto/streaming";
import WebsocketClientService from "../../websocket/client.service";


export class SendToStreamConsumer {
    constructor(
        private readonly websocketClientService: WebsocketClientService,
    ) {
    }

    async execute(message: streamingProto.BattleRequest): Promise<void> {
        logger.log('sendToStream', message);

        try {
            await this.websocketClientService.send(message);
        } catch (error) {
            logger.error(`[Websocket] Failed to process message`, {
                rawValue: message,
                error,
            });
            throw error;
        }

    }

}

export default SendToStreamConsumer;

