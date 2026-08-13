// import * as battleProto from "../../../contracts/proto/battle";
// import BattleStartUseCase from "../../../application/use-cases/engine/engine-start";
// import BattleProtoMapper from "../../grpc/mappers/engine.proto.mapper";
// import logger from "@shared/logger";
import {connectToBattle} from "../services/battle.service";
import logger from "@shared/logger";
import * as battleProto from "../grpc/generated/battle";
import UseCaseInterface from "../interfaces/use-case.interface";


export class ConnectingBattleRequestConsumer implements UseCaseInterface<battleProto.BattleObject> {
    constructor(
//         private readonly battleStartUseCase: BattleStartUseCase,
    ) {
    }

    async execute(topic: string, partition: number, message: battleProto.BattleObject): Promise<void> {
        try {
            logger.log('message received', message);
            connectToBattle(message);
        } catch (error) {
            logger.error(`[Kafka] Failed to process message`, {
                rawValue: message.battleId,
                error,
            });
        }

//         try {
//             // logger.log('BattleStartedConsumer');
//             // logger.log(message);
//             const battle = BattleProtoMapper.toDomain(message);
//             await this.battleStartUseCase.execute(battle);
//         } catch (error) {
//             logger.error(`[Kafka] Failed to process message`, {
//                 rawValue: message.id,
//                 error,
//             });
//         }
    }

}

export default ConnectingBattleRequestConsumer;


