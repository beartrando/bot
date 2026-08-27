import * as engineProto from "../../../contracts/proto/engine";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";
import BattleMoveCellIdx from "../../../domain/battle/value-objects/move/battle-move-cell-idx.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";

export class BattleMoveProtoMapper {
    static toProto(move: BattleMove): engineProto.BattleMove {
        return engineProto.BattleMove.create({
            battleId: move.battleId.value,
            profileId: move.profileId.value,
            cellIdx: move.cellIdx.value,
        });
    }

    static toDomain(move: engineProto.BattleMove): BattleMove {
        return BattleMove.create({
            battleId: new BattleId(move.battleId),
            profileId: new ProfileId(move.profileId),
            cellIdx: new BattleMoveCellIdx(move.cellIdx),
        });
    }
}

export default BattleMoveProtoMapper;
