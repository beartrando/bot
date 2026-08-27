import BattleEntity from "../battle.entity";
import ProfileId from "../../profile/value-objects/profile-id.vo";
import BattleCellValueEnum from "../enums/battle-cell-value.enum";

export class BattleTurnRule {
    calculate(entity: BattleEntity): ProfileId {
        const moves = entity.board.cells.filter(
            cell => cell !== BattleCellValueEnum.EMPTY,
        ).length;

        const playerIds = entity.playerIds.value;

        if (moves % 2 === 0) {
            return playerIds[0];
        }

        return playerIds[1];
    }
}

export default BattleTurnRule;
