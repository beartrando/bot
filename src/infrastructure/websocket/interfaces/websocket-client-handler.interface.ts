import WebSocket from "ws";

export interface WebsocketClientHandlerInterface {
    handle(
        data: WebSocket.RawData,
    ): Promise<void>;
}

export default WebsocketClientHandlerInterface;
