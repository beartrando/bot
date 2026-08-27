import logger from "@shared/logger";
import GrpcService from "../infrastructure/grpc/service";
import JobService from "../infrastructure/job/service";
import MessageService from "../infrastructure/message/service";
import WebsocketClientService from "../infrastructure/websocket/client.service";
import AuthService from "../infrastructure/auth/service";

export class Application {
    constructor(
        private readonly authService: AuthService,
        private readonly grpcService: GrpcService,
        private readonly jobService: JobService,
        private readonly messageService: MessageService,
        private readonly websocketClientService: WebsocketClientService,
    ) {
    }

    async start(): Promise<void> {
        const shutdown = async () => {
            logger.info("🛑 Shutting down...");

            await this.stop();

            process.exit(0);
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);


        try {
            await this.authService.start();
            await this.messageService.start();
            await this.jobService.start();
            await this.grpcService.start();
            await this.websocketClientService.start();
            logger.info(
                '🚀 Bot service started',
            );
        } catch (err) {
            logger.error(
                {err},
                '💥 Failed to start Bot service',
            );
            process.exit(1);
        }
    }

    async stop() {
        await this.websocketClientService.stop();
        await this.authService.stop();
        await this.grpcService.stop();
        await this.jobService.stop();
        await this.messageService.stop();
    }
}

export default Application;
