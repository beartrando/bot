import Application from "../application/application";

import GrpcService from "../infrastructure/grpc/service";

import AuthService from "../infrastructure/auth/service";
import authConfig from "../infrastructure/auth/auth.config";
import JobService from "../infrastructure/job/service";
import jobConfig from "../infrastructure/job/job.config";
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


function buildApplication() {
    const authService = new AuthService(authConfig);
    // const timerCallbackFactoryHolder = new TimerCallbackFactoryHolder<WebSocket>();
    // const timerService = new TimerService<TimerKey, WebSocket>(timerCallbackFactoryHolder);
    // const cacheService = new CacheService(redisConfig);
    // const grpcStreamService = new GrpcStreamService<engineProto.BattleRequest>();

    const jobService = new JobService(
        jobConfig,
        messageConfig,
        messageProducersConfig,
    );

    // const profileClinent = new ProfileClient(grpcConfig.serviceProfileUrl);
    //
    // const authorizeProfileUseCase = new AuthorizeProfileUseCase(
    //     profileClinent,
    // );
    //
    // const battleTimeoutUseCase = new BattleTimeoutUseCase(timerService);
    //
    // const battleTimeoutCallbackFactory = new BattleTimeoutCallbackFactory(
    //     battleTimeoutUseCase,
    // );
    //
    // timerCallbackFactoryHolder.factory = battleTimeoutCallbackFactory;

    const messageService = new MessageService(
        messageConfig,
        messageConsumersConfig,
        // battleStartedConsumer,
    );

    // const wsSocketContextStateStore = new StateStore<WebSocket, SocketContext>();
    // const battleWsStateStore = new StateStore<Id, Set<WebSocket>>();
    //
    // const battleWebsocketsRegistry = new BattleWebsocketsRegistry(
    //     wsSocketContextStateStore,
    //     battleWsStateStore,
    //     timerService,
    // );
    //
    // const battleClient = new BattleClient(grpcConfig.serviceBattleUrl);
    //
    // const battleLeaveUseCase = new BattleLeaveUseCase(
    //     battleWebsocketsRegistry,
    //     grpcStreamService,
    // );
    //
    // const battleStartUseCase = new BattleStartUseCase(
    //     battleWebsocketsRegistry,
    //     battleClient,
    // );
    // const battleMoveUseCase = new BattleMoveUseCase(
    //     battleWebsocketsRegistry,
    //     grpcStreamService,
    // );
    //
    // const battleConnectBotUseCase = new BattleConnectBotUseCase(
    //     jobService,
    //     wsSocketContextStateStore,
    //     battleWsStateStore,
    //     messageProducersConfig.aiConnectingRequest,
    // );
    //
    // const battleHandler = new BattleHandler(
    //     timerService,
    //     battleStartUseCase,
    //     battleMoveUseCase,
    //     battleConnectBotUseCase,
    //     battleLeaveUseCase,
    // );
    //
    // const connectionHandler = new ConnectionHandler(
    //     authService,
    //     authorizeProfileUseCase,
    //     battleLeaveUseCase,
    //     battleWebsocketsRegistry,
    //     timerService,
    // );
    //
    // connectionHandler.registerHandler('/battle', battleHandler);

    const websocketClientService = new WebsocketClientService(
        websocketClientConfig,
        // connectionHandler,
    );

    // const battleStartedUseCase = new BattleStartedUseCase;
    // const battleUpdatedUseCase = new BattleUpdatedUseCase;
    //
    // const engineStream = new EngineStream(
    //     grpcConfig.serviceEngineUrl,
    //     battleUpdatedUseCase
    // );
    //
    // grpcStreamService.stream = engineStream;

    const healthUseCase = new HealthUseCase(
        jobService,
        messageService,
        // cacheService,
        websocketClientService,
        // grpcStreamService,
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
        // cacheService,
        websocketClientService,
    );
}

export default buildApplication;
