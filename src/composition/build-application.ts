import Application from "../application/application";

import GrpcService from "../infrastructure/grpc/service";

import AuthService from "../infrastructure/auth/service";
import authConfig from "../infrastructure/auth/auth.config";
import JobService from "../infrastructure/job/service";
import jobConfig from "../infrastructure/job/configs/job.config";
import messageConfig from "../infrastructure/message/configs/message.config";
import messageProducersConfig from "../infrastructure/message/configs/producers.config";
import grpcConfig from "../infrastructure/grpc/configs/grpc.config";
import HealthUseCase from "../application/use-cases/health/health";
import websocketClientConfig from "../infrastructure/websocket/configs/websocket-client.config";
import MessageService from "../infrastructure/message/service";
import WebsocketClientService from "../infrastructure/websocket/client.service";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import messageConsumersConfig from "../infrastructure/message/configs/consumers.config";
import jobConsumersConfig from "../infrastructure/job/configs/job.consumers.config";
import SendToStreamConsumer from "../infrastructure/job/consumers/send-to-stream.consumer";
import HttpClient from "../infrastructure/http/client";
import httpClientConfig from "../infrastructure/http/configs/http.client.config";
import WebsocketClient from "../infrastructure/websocket/websocket.client";
import ProfileService from "../infrastructure/profile/service";
import BattleHandler from "../infrastructure/websocket/handlers/battle.handler";
import BattleMoveUseCase from "../application/use-cases/battle/battle-move";
import AnonymousSignInUseCase from "../application/use-cases/auth/anonimous-sign-in";
import DeviceId from "../domain/device/value-objects/device-id.vo";
import domainBattleConfig from "../domain/device/config/config";
import FetchProfileUseCase from "../application/use-cases/profile/fetch-profile";


function buildApplication() {


    const httpService = new HttpClient(
        httpClientConfig.host,
        httpClientConfig.port,
    );

    const deviceId = new DeviceId(domainBattleConfig.deviceId);
    const anonimousSignInUseCase = new AnonymousSignInUseCase(httpService);
    const authService = new AuthService(authConfig, anonimousSignInUseCase, deviceId);
    const fetchProfileUseCase = new FetchProfileUseCase(httpService);
    const profileService = new ProfileService(authService, fetchProfileUseCase);

    const jobService = new JobService(
        jobConfig,
        messageConfig,
        messageProducersConfig,
    );

    const messageService = new MessageService(
        messageConfig,
        messageConsumersConfig,
    );

    const battleMoveUseCase = new BattleMoveUseCase();
    const battleHandler = new BattleHandler(battleMoveUseCase);

    const websocketClient = new WebsocketClient(
        authService,
        profileService,
        websocketClientConfig,
        battleHandler
    );

    const websocketClientService = new WebsocketClientService(
        websocketClient,
    );

    const sendToStreamConsumer = new SendToStreamConsumer(websocketClientService);

    jobService.registerWorkers(
        jobConsumersConfig.websocketSendEvent,
        sendToStreamConsumer.execute.bind(sendToStreamConsumer)
    );

    const healthUseCase = new HealthUseCase(
        jobService,
        messageService,
        websocketClientService,
    );

    const statusUseCase = new StatusUseCase();
    const livezUseCase = new LivezUseCase();
    const readyzUseCase = new ReadyzUseCase();

    const healthHandler = new HealthHandler(
        healthUseCase,
        statusUseCase,
        livezUseCase,
        readyzUseCase,
    );

    const grpcService = new GrpcService(
        grpcConfig.port,
        healthHandler,
    );

    return new Application(
        grpcService,
        jobService,
        messageService,
        websocketClientService,
    );
}

export default buildApplication;
