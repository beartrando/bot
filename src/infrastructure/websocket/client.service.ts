import {WebSocketServer,} from "ws";
import logger from "@shared/logger";
import WebsocketClientConfig from "./types/websocket-client-config";
import WebsocketConnectionHandlerInterface from "./interfaces/websocket-connection-handler.interface";

export class WebsocketClientService {
    constructor(
        private readonly config: WebsocketClientConfig,
    ) {
    }

    async start(): Promise<void> {
    }

    async stop(): Promise<void> {
    }

    async check(): Promise<boolean> {
        return true;
    }
}

export default WebsocketClientService;