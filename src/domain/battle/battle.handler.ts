import * as streamingProto from "../grpc/generated/streaming";
import * as battleProto from "../grpc/generated/battle";
import battleClient from "../clients/battle.client";
import logger from "@shared/logger";
import pgBossManager from "@shared/pg-boss-manager";


export const startBattle = async (req: streamingProto.BattleStart) => {
    const message = streamingProto.BattleRequest.create({start: req});
    // logger.log('startBattle');
    // logger.log(pgBossConsumersConfig.websocketSendEvent.topic, message);
    await pgBossManager.queue.enqueue(pgBossConsumersConfig.websocketSendEvent.topic, message);
}

export const makeMove = async (battle: battleProto.BattleObject) => {
    if (!await isMyTurn(battle)) {
        logger.info('Not my turn')
        return;
    }
    const cellIdx = await calculateMove(battle);

    if (cellIdx === null) {
        return;
    }

    const battleId = battle.id;
    const req = streamingProto.BattleRequest.create({
        move: streamingProto.BattleMove.create({
            battleId,
            cellIdx
        })
    });
    await pgBossManager.queue.enqueue(pgBossConsumersConfig.websocketSendEvent.topic, req);
    logger.log('message moved to pgBoss')
}

const isMyTurn = async (battle: battleProto.BattleObject): Promise<boolean> => {
    const profile = await battleClient.getProfile();

    // считаем количество занятых клеток
    const filledCount = battle.cells.filter(cell => cell !== battleProto.BattleCellValue.CELL_EMPTY).length;

    // вычисляем индекс текущего игрока
    const currentPlayerIndex = filledCount % battle.playerIds.length;
    const currentPlayerId = battle.playerIds[currentPlayerIndex];

    // мой ли это ход?
    return currentPlayerId === profile.id;
};


export const calculateMove = async (battle: battleProto.BattleObject): Promise<number | null> => {
    const profile = await battleClient.getProfile();
    const myIndex = battle.playerIds.indexOf(profile.id);
    if (myIndex === -1) return null;

    const mySymbol = myIndex === 0 ? battleProto.BattleCellValue.CELL_X : battleProto.BattleCellValue.CELL_O;

    const oppSymbol = mySymbol === battleProto.BattleCellValue.CELL_X
        ? battleProto.BattleCellValue.CELL_O
        : battleProto.BattleCellValue.CELL_X;

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
};


