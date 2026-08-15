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
        if (!(await this.check())) {
            throw new Error("WebSocket is not connected");
        }

        await this.websocketClient.send(message);
    }

    async check(): Promise<boolean> {
        return this.websocketClient.isConnected();
    }
}

export default WebsocketClientService;