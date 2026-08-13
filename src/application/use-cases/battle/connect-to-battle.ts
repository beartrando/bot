import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import JobService from "../../../infrastructure/job/service";

export class ConnectToBattleUseCase {
    constructor(
        private readonly jobService: JobService,
    ) {
    }

    async execute(battleId: BattleId): Promise<void> {
        this.jobService.enqueue();
    }
}

export default HealthUseCase;

