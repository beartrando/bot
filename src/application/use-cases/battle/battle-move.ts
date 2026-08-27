import * as streamingProto from "../../../contracts/proto/streaming";
import logger from "@shared/logger";

export class BattleMoveUseCase {
    constructor() {
    }

    async execute(message: streamingProto.BattleResponse): Promise<void> {
        logger.log(message);
    }
}

export default BattleMoveUseCase;

