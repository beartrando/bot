import BattleEntity from "../battle.entity";
import BattleMove from "../value-objects/battle-move.vo";

import logger from "@shared/logger";
import ProfileId from "../../profile/value-objects/profile-id.vo";
import BattleTurnRule from "../rules/battle-turn.rule";
import battleCellValueEnum from "../enums/battle-cell-value.enum";

const battleTurnRule = new BattleTurnRule;

export class BattleNextMoveResolver {
    constructor(
    ) {
    }

    resolve(
        battle: BattleEntity,
    ): BattleMove {

        const playerId = battleTurnRule.calculate(battle);

        const cellIdx = await this.calculateMove(battle, playerId);

        if (cellIdx === null) {
            return;
        }

        const battleMove = new BattleMove(battle.id, cellIdx);
        return battleMove;
    }


    calculateMove(battle: battleEntity, profileId: ProfileId): number | null {
        const myIndex = battle.playerIds.indexOf(profileId.value());
        if (myIndex === -1) return null;

        const mySymbol = myIndex === 0 ? BattleCellValueEnum.X : BattleCellValueEnum.O;

        const oppSymbol = mySymbol === BattleCellValueEnum.X
            ? BattleCellValueEnum.O
            : BattleCellValueEnum.X;

        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // столбцы
            [0, 4, 8], [2, 4, 6]          // диагонали
        ];

        const isWinningMove = (cells: battleProto.BattleCellValue[], symbol: battleProto.BattleCellValue, idx: number) => {
            const clone = [...cells];
            clone[idx] = symbol;
            return winningCombos.some(combo =>
                combo.every(c => clone[c] === symbol)
            );
        };

        // 1. Попробовать выиграть
        for (let i = 0; i < battle.cells.length; i++) {
            if (battle.cells[i] === battleProto.BattleCellValue.CELL_EMPTY) {
                if (isWinningMove(battle.cells, mySymbol, i)) return i;
            }
        }

        // 2. Заблокировать соперника
        for (let i = 0; i < battle.cells.length; i++) {
            if (battle.cells[i] === battleProto.BattleCellValue.CELL_EMPTY) {
                if (isWinningMove(battle.cells, oppSymbol, i)) return i;
            }
        }

        // 3. Центр
        if (battle.cells[4] === battleProto.BattleCellValue.CELL_EMPTY) return 4;

        // 4. Углы
        const corners = [0, 2, 6, 8];
        for (const c of corners) {
            if (battle.cells[c] === battleProto.BattleCellValue.CELL_EMPTY) return c;
        }

        // 5. Любая свободная клетка
        const idx = battle.cells.findIndex(cell => cell === battleProto.BattleCellValue.CELL_EMPTY);
        return idx >= 0 ? idx : null;
    }



}



export default BattleNextMoveResolver;

