import * as streamingProto from "../../../contracts/proto/streaming";
import logger from "@shared/logger";
import JobService from "../../../infrastructure/job/service";
import ProfileService from "../../../infrastructure/profile/service";
import BattleMoveUseCaseInterface from "../../../infrastructure/websocket/handlers/battle-move-use-case-interface";
import battleEntity from "../../../domain/battle/battle.entity";
import BattleDomain from "../../../domain/battle/battle.domain";
import BattleMoveProtoMapper from "../../../infrastructure/grpc/mappers/battle-move.proto.mapper";

export class BattleMoveUseCase implements BattleMoveUseCaseInterface {
    constructor(
        private readonly profileService: ProfileService,
        private readonly jobService: JobService,
        private readonly websocketSendEventTopic: string,
    ) {
    }

    async execute(battle: battleEntity): Promise<void> {

        const battleDomain = BattleDomain.of(battle);
        const profile = await this.profileService.fetchProfile();

        if (!await battleDomain.isMyTurn(profile.id)) {
            return;
        }

        try {
            const battleMove = battleDomain.resolveMove(profile.id);
            const req = streamingProto.BattleRequest.create({
                move: BattleMoveProtoMapper.toProto(battleMove)
            });

            this.jobService.enqueue(this.websocketSendEventTopic, req);
            logger.log('message moved to pgBoss')

        } catch (err) {
            logger.info(err)
        }
    }

}

export default BattleMoveUseCase;

