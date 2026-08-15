import * as healthProto from "../../../contracts/proto/common/health";
import MessageService from "../../../infrastructure/message/service";
import JobService from "../../../infrastructure/job/service";
import appConfig from "../../../infrastructure/app/app.config";
import WebsocketClientService from "../../../infrastructure/websocket/client.service";
import AuthService from "../../../infrastructure/auth/service";

export class HealthUseCase {
    constructor(
        private readonly authService: AuthService,
        private readonly jobService: JobService,
        private readonly messageService: MessageService,
        private readonly websocketClientService: WebsocketClientService,
    ) {
    }

    async execute(): Promise<healthProto.HealthReport> {
        const [authOk, jobServiceOk, messageServiceOk, websocketClientServiceOk,] = await Promise.all([
            this.authService.check(),
            this.jobService.check(),
            this.messageService.check(),
            this.websocketClientService.check(),
        ]);


        const components = {
            auth: authOk,
            job: jobServiceOk,
            message: messageServiceOk,
            websocketClient: websocketClientServiceOk,
        };

        return {
            service: appConfig.appName,
            status: this.toHealthStatus(
                Object.values(components).every(Boolean),
            ),
            components: Object.fromEntries(
                Object.entries(components).map(([name, ok]) => [
                    name,
                    this.toHealthStatus(ok),
                ]),
            ),
            timestamp: new Date(),
        };
    }

    private toHealthStatus(ok: boolean): healthProto.HealthStatus {
        return ok
            ? healthProto.HealthStatus.HEALTH_STATUS_OK
            : healthProto.HealthStatus.HEALTH_STATUS_FAIL;
    }
}

export default HealthUseCase;

