import BattleEntity from "../battle.entity";
import BattleId from "../../battle/value-objects/battle-id.vo";

export class BattleTurnRule {
    calculate(entity: BattleEntity): BattleId {
        const moves = entity.board.cells.filter(
            cell => cell !== "EMPTY",
        ).length;

        const playerIds = entity.playerIds.value;

        if (moves % 2 === 0) {
            return playerIds[0];
        }

        return playerIds[1];
    }
}

export default BattleTurnRule;
