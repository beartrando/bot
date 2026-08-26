import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import JobService from "../../../infrastructure/job/service";
import WebsocketClientService from "../../../infrastructure/websocket/client.service";
import * as streamingProto from "../../../contracts/proto/streaming";
import jobConsumersConfig from "../../../infrastructure/job/configs/job.consumers.config";

export class ConnectToBattleUseCase {
    constructor(
        private readonly jobService: JobService,
        private readonly websocketSendEventTopic: string,
    ) {
    }

    async execute(battleId: BattleId): Promise<void> {
        const request = streamingProto.BattleStart.create({battleId: battleId.value});
        this.jobService.enqueue(this.websocketSendEventTopic, request);
    }
}

export default ConnectToBattleUseCase;

