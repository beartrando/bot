import BattleEntity from "./battle.entity";
import BattleMove from "./value-objects/battle-move.vo";
import BattleId from "./value-objects/battle-id.vo";

import BattleMoveOperation from "./operations/battle-move.operation";

import BattleCellRule from "./rules/battle-cell.rule";
import BattleTurnRule from "./rules/battle-turn.rule";

const cellRule = new BattleCellRule();
const turnRule = new BattleTurnRule();

const moveOperation = new BattleMoveOperation(
    cellRule,
    turnRule,
);

export class BattleDomain {
    private constructor(private readonly _entity: BattleEntity) {
    }

    get entity(): BattleEntity {
        return this._entity;
    }

    static of(entity: BattleEntity): BattleDomain {
        return new BattleDomain(entity);
    }

    move(move: BattleMove): BattleEntity {
        return moveOperation.execute(this.entity, move);
    }

    turn(): BattleId {
        return turnRule.calculate(this.entity);
    }
}

export default BattleDomain;
