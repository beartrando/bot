import battleEntity from "../../../domain/battle/battle.entity";

interface BattleUpdtedUseCaseInterface {
    execute(battle: battleEntity): Promise<void>;
}

export default BattleUpdtedUseCaseInterface;
