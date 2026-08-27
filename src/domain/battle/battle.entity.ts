import BattleBoard from "./value-objects/battle-board.vo";
import BattlePlayerIds from "./value-objects/battle-player-ids.vo";
import BattleStatus from "./value-objects/battle-status.vo";
import BattleStatusEnum from "./enums/battle-status.enum";
import BattleMove from "./value-objects/battle-move.vo";
import BattleId from "./value-objects/battle-id.vo";
import ProfileId from "../profile/value-objects/profile-id.vo";
import BattleTurnRule from "./rules/battle-turn.rule";
import BattleNextMoveResolver from "./resolver/battle-next-move.resolver";

const battleTurnRule = new BattleTurnRule();
const battleNextMoveResolver = new BattleNextMoveResolver();

export type BattleEntityProps = {
    id: BattleId;
    playerIds: BattlePlayerIds;
    board?: BattleBoard;
    status?: BattleStatus;
    winnerId?: ProfileId | null;
    lastMoveAt?: Date | null;
};

export class BattleEntity {
    constructor(
        readonly id: BattleId,
        readonly playerIds: BattlePlayerIds,
        readonly board: BattleBoard,
        readonly status: BattleStatus,
        readonly winnerId: ProfileId | null,
        readonly lastMoveAt: Date | null,
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

    calculateTurn(): ProfileId {
        return battleTurnRule.calculate(this);
    }

    calculateNextMove(): BattleMove {
        return battleNextMoveResolver.resolve(this);
    }
}

export default BattleEntity;
