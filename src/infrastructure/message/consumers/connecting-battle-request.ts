import logger from "@shared/logger";
import * as streamingProto from "../../../contracts/proto/streaming";
import UseCaseInterface from "../interfaces/use-case.interface";


export class ConnectingBattleRequestConsumer implements UseCaseInterface<streamingProto.BattleJoinBot> {
    constructor(
//         private readonly battleStartUseCase: BattleStartUseCase,
    ) {
    }

    async execute(topic: string, partition: number, message: streamingProto.BattleJoinBot): Promise<void> {
//         try {
//             logger.log('message received', message);
//             connectToBattle(message);
//         } catch (error) {
//             logger.error(`[Kafka] Failed to process message`, {
//                 rawValue: message.battleId,
//                 error,
//             });
//         }
//
// //         try {
// //             // logger.log('BattleStartedConsumer');
// //             // logger.log(message);
// //             const battle = BattleProtoMapper.toDomain(message);
// //             await this.battleStartUseCase.execute(battle);
// //         } catch (error) {
// //             logger.error(`[Kafka] Failed to process message`, {
// //                 rawValue: message.id,
// //                 error,
// //             });
// //         }
    }

}

export default ConnectingBattleRequestConsumer;


