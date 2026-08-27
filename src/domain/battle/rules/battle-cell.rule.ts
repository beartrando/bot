import BattleEntity from "../battle.entity";
import battleCellIdx from "../value-objects/move/cell-idx.vo";
import BattleCellValueEnum from "../enums/battle-cell-value.enum";

export class BattleCellRule {
    calculate(
        entity: BattleEntity,
        cellIdx: battleCellIdx,
    ): boolean {
        return entity.board.cells[cellIdx.value] === BattleCellValueEnum.EMPTY;
    }
}

export default BattleCellRule;
