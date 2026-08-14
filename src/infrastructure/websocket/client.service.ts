import WebsocketClientConfig from "./types/websocket-client-config";

export class WebsocketClientService {
    constructor(
        private readonly config: WebsocketClientConfig,
    ) {
    }

    async start(): Promise<void> {
    }

    async stop(): Promise<void> {
    }

    async send(message: any): Promise<void> {
    }
    async check(): Promise<boolean> {
        return true;
    }
}

export default WebsocketClientService;