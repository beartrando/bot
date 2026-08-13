import WebsocketClientConfig from "../types/websocket-client-config";

export const websocketClientConfig: WebsocketClientConfig = {
    sererUrl: process.env.WEBSOCKET_STREAMING ?? 'streaming:8080',
};

export default websocketClientConfig;
