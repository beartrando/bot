import BattleEntity from "../battle.entity";
import BattleMove from "../value-objects/battle-move.vo";
import ProfileId from "../../profile/value-objects/profile-id.vo";
import BattleTurnRule from "../rules/battle-turn.rule";
import BattleMoveCellIdx from "../value-objects/move/battle-move-cell-idx.vo";
import BattleCellValueEnum from "../enums/battle-cell-value.enum";

const battleTurnRule = new BattleTurnRule;

export class BattleNextMoveResolver {
    constructor() {
    }

    resolve(
        battle: BattleEntity,
    ): BattleMove {

        const playerId = battleTurnRule.calculate(battle);

        const cellIdx = this.calculateMove(battle, playerId);

        if (cellIdx === null) {
            throw new Error("Cannot calculate next move");
        }

        const battleMove = BattleMove.create({battleId: battle.id, cellIdx: new BattleMoveCellIdx(cellIdx)});
        return battleMove;
    }


    calculateMove(battle: BattleEntity, profileId: ProfileId): number | null {
        const mySymbol = battle.playerIds.cellValueOf(profileId);

        const opponentSymbol =
            mySymbol === BattleCellValueEnum.X
                ? BattleCellValueEnum.O
                : BattleCellValueEnum.X;

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const isWinningMove = (
            symbol: BattleCellValueEnum,
            cellIdx: number,
        ): boolean => {
            const cells = battle.board.cells;
            const clone = [...cells];

            clone[cellIdx] = symbol;

            return winningCombos.some(combo =>
                combo.every(idx => clone[idx] === symbol),
            );
        };

        // 1. Победить
        for (let i = 0; i < battle.board.cells.length; i++) {
            if (battle.board.cells[i] !== BattleCellValueEnum.EMPTY) {
                continue;
            }

            if (isWinningMove(mySymbol, i)) {
                return i;
            }
        }

        // 2. Заблокировать соперника
        for (let i = 0; i < battle.board.cells.length; i++) {
            if (battle.board.cells[i] !== BattleCellValueEnum.EMPTY) {
                continue;
            }

            if (isWinningMove(opponentSymbol, i)) {
                return i;
            }
        }

        // 3. Центр
        if (battle.board.cells[4] === BattleCellValueEnum.EMPTY) {
            return 4;
        }

        // 4. Углы
        const corners = [0, 2, 6, 8];

        for (const index of corners) {
            if (battle.board.cells[index] === BattleCellValueEnum.EMPTY) {
                return index;
            }
        }

        // 5. Любая свободная клетка
        const index = battle.board.cells.findIndex(
            cell => cell === BattleCellValueEnum.EMPTY,
        );

        return index >= 0 ? index : null;
    }


}


export default BattleNextMoveResolver;

