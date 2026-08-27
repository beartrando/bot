import battleEntity from "../../../domain/battle/battle.entity";

interface BattleMoveUseCaseInterface {
    execute(battle: battleEntity): Promise<void>;
}

export default BattleMoveUseCaseInterface;