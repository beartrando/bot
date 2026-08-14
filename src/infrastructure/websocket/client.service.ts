import WebsocketClient from "./websocket.client";

export class WebsocketClientService {
    constructor(
        private readonly websocketClient: WebsocketClient,
    ) {
    }

    async start(): Promise<void> {
        await this.websocketClient.connect();
    }

    async stop(): Promise<void> {
        await this.websocketClient.disconnect(0);
    }

    async send(message: any): Promise<void> {
        if (!this.check()) {
            throw new Error();
        }
        this.websocketClient.send(message);
    }

    async check(): Promise<boolean> {
        return true;
    }
}

export default WebsocketClientService;