import * as engineProto from "../../../contracts/proto/engine";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";
import BattleMoveCellIdx from "../../../domain/battle/value-objects/move/battle-move-cell-idx.vo";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";

export class BattleMoveProtoMapper {
    static toProto(move: BattleMove): engineProto.BattleMove {
        return engineProto.BattleMove.create({
            battleId: move.battleId.value,
            cellIdx: move.cellIdx.value,
        });
    }

    static toDomain(move: engineProto.BattleMove): BattleMove {
        return BattleMove.create({
            battleId: new BattleId(move.battleId),
            cellIdx: new BattleMoveCellIdx(move.cellIdx),
        });
    }
}

export default BattleMoveProtoMapper;
