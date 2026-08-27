import BattleBoard from "./value-objects/battle-board.vo";
import BattlePlayerIds from "./value-objects/battle-player-ids.vo";
import BattleStatus from "./value-objects/battle-status.vo";
import BattleStatusEnum from "./enums/battle-status.enum";
import BattleMove from "./value-objects/battle-move.vo";
import BattleId from "../battle/value-objects/battle-id.vo";
import logger from "@shared/logger";
import ProfileId from "../profile/value-objects/profile-id.vo";

export type BattleEntityProps = {
    id: BattleId;
    playerIds: BattlePlayerIds;
    board?: BattleBoard;
    status?: BattleStatus;
    winnerId?: BattleId | null;
    lastMoveAt?: Date | null;
};

export class BattleEntity {
    constructor(
        readonly id: BattleId,
        readonly playerIds: BattlePlayerIds,
        public board: BattleBoard,
        public status: BattleStatus,
        public winnerId: ProfileId | null,
        public lastMoveAt: Date | null,
    ) {
    }

    static create(props: BattleEntityProps): BattleEntity {
        return new BattleEntity(
            props.id,
            props.playerIds,
            props.board ?? BattleBoard.empty(),
            props.status ?? new BattleStatus(BattleStatusEnum.New),
            props.winnerId ?? null,
            props.lastMoveAt ?? null,
        );
    }

    move(move: BattleMove): BattleEntity {
        const cellValue = this.playerIds.cellValueOf(move.profileId);

        this.board = this.board.move(
            move.cellIdx.value,
            cellValue,
        );

        this.lastMoveAt = new Date();

        return this;
    }

    leave(profileId: ProfileId): BattleEntity {
        // logger.log(new Error().stack);

        this.status = new BattleStatus(BattleStatusEnum.Finished);
        this.winnerId = this.playerIds.opponentOf(profileId);

        return this;
    }

    finish(playerId?: ProfileId): BattleEntity {
        // logger.log(new Error().stack);
        this.status = new BattleStatus(BattleStatusEnum.Finished);
        if (playerId) {
            this.winnerId = playerId;
        }

        return this;
    }
}

export default BattleEntity;
