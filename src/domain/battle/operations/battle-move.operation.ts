import BattleEntity from "../battle.entity";
import BattleMove from "../value-objects/battle-move.vo";

import BattleCellRule from "../rules/battle-cell.rule";
import BattleTurnRule from "../rules/battle-turn.rule";
import logger from "@shared/logger";

export class BattleMoveOperation {
    constructor(
        private readonly cellRule: BattleCellRule,
        private readonly turnRule: BattleTurnRule,
    ) {
    }

    execute(
        entity: BattleEntity,
        move: BattleMove,
    ): BattleEntity {
        const playerId = move.profileId;

        const turnPlayerId = this.turnRule.calculate(entity);

        if (!playerId.equals(turnPlayerId)) {
            throw new Error("Cannot move battle: not your turn");
        }

        if (!this.cellRule.calculate(entity, move.cellIdx)) {
            throw new Error("Cannot move battle: cell is not empty");
        }

        // logger.log(entity)
        // logger.log(move)
        entity.move(move);

        // logger.log(entity)
        return entity;
    }
}

export default BattleMoveOperation;
