import * as streamingProto from "../../../contracts/proto/streaming";
import * as battleProto from "../../../contracts/proto/battle";
import logger from "@shared/logger";
import pgBossManager from "@shared/pg-boss-manager";
import JobService from "../../../infrastructure/job/service";
import ProfileService from "../../../infrastructure/profile/service";
import BattleMoveUseCaseInterface from "../../../infrastructure/websocket/handlers/battle-move-use-case-interface";
import battleEntity from "../../../domain/battle/battle.entity";

export class BattleMoveUseCase implements BattleMoveUseCaseInterface{
    constructor(
        private readonly profileService: ProfileService,
        private readonly jobService: JobService,
        private readonly websocketSendEventTopic: string,
    ) {
    }

    async execute(battle: battleEntity): Promise<void> {

//         const battle = message.battle;
//
//         if (!battle) {
//             return;
//         }
//
//         if (!await this.isMyTurn(battle)) {
//             logger.info('Not my turn')
//             return;
//         }
//         const cellIdx = await this.calculateMove(battle);
//
//         if (cellIdx === null) {
//             return;
//         }
//
//         const battleId = battle.id;
//         const req = streamingProto.BattleRequest.create({
//             move: streamingProto.BattleMove.create({
//                 battleId,
//                 cellIdx
//             })
//         });
// ``
//         this.jobService.enqueue(this.websocketSendEventTopic, req);
//         logger.log('message moved to pgBoss')
    }



    // async isMyTurn(battle: battleProto.BattleObject): Promise<boolean> {
    //     const profile = await this.profileService.fetchProfile();
    //
    //     // считаем количество занятых клеток
    //     const filledCount = battle.board.filter(cell => cell !== battleProto.BattleCellValue.CELL_EMPTY).length;
    //
    //     // вычисляем индекс текущего игрока
    //     const currentPlayerIndex = filledCount % battle.playerIds.length;
    //     const currentPlayerId = battle.playerIds[currentPlayerIndex];
    //
    //     // мой ли это ход?
    //     return currentPlayerId === profile.id.value;
    // }
    //
    //
    // async calculateMove(battle: battleProto.BattleObject): Promise<number | null> {
    //     const profile = await this.profileService.fetchProfile();
    //     const myIndex = battle.playerIds.indexOf(profile.id);
    //     if (myIndex === -1) return null;
    //
    //     const mySymbol = myIndex === 0 ? battleProto.BattleCellValue.CELL_X : battleProto.BattleCellValue.CELL_O;
    //
    //     const oppSymbol = mySymbol === battleProto.BattleCellValue.CELL_X
    //         ? battleProto.BattleCellValue.CELL_O
    //         : battleProto.BattleCellValue.CELL_X;
    //
    //     const winningCombos = [
    //         [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
    //         [0, 3, 6], [1, 4, 7], [2, 5, 8], // столбцы
    //         [0, 4, 8], [2, 4, 6]          // диагонали
    //     ];
    //
    //     const isWinningMove = (cells: battleProto.BattleCellValue[], symbol: battleProto.BattleCellValue, idx: number) => {
    //         const clone = [...cells];
    //         clone[idx] = symbol;
    //         return winningCombos.some(combo =>
    //             combo.every(c => clone[c] === symbol)
    //         );
    //     };
    //
    //     // 1. Попробовать выиграть
    //     for (let i = 0; i < battle.cells.length; i++) {
    //         if (battle.cells[i] === battleProto.BattleCellValue.CELL_EMPTY) {
    //             if (isWinningMove(battle.cells, mySymbol, i)) return i;
    //         }
    //     }
    //
    //     // 2. Заблокировать соперника
    //     for (let i = 0; i < battle.cells.length; i++) {
    //         if (battle.cells[i] === battleProto.BattleCellValue.CELL_EMPTY) {
    //             if (isWinningMove(battle.cells, oppSymbol, i)) return i;
    //         }
    //     }
    //
    //     // 3. Центр
    //     if (battle.cells[4] === battleProto.BattleCellValue.CELL_EMPTY) return 4;
    //
    //     // 4. Углы
    //     const corners = [0, 2, 6, 8];
    //     for (const c of corners) {
    //         if (battle.cells[c] === battleProto.BattleCellValue.CELL_EMPTY) return c;
    //     }
    //
    //     // 5. Любая свободная клетка
    //     const idx = battle.cells.findIndex(cell => cell === battleProto.BattleCellValue.CELL_EMPTY);
    //     return idx >= 0 ? idx : null;
    // }



}

export default BattleMoveUseCase;

