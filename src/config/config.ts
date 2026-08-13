const [host, portStr] = (process.env.HTTP_GATEWAY ?? "gateway:8080").split(":");
const httpGatewayHost = host ?? "gateway";
const httpGatewayPort = Number(portStr) ?? 8080;
const httpGateway = httpGatewayHost + ':' + httpGatewayPort;


export const config = {
    httpGatewayHost: httpGatewayHost,
    httpGatewayPort: httpGatewayPort,
    httpGateway: httpGateway,
    accessSecret: process.env.ACCESS_SECRET ?? (() => {
        throw new Error("ACCESS_SECRET missing");
    })(),
    webSocketStreaming: process.env.WEBSOCKET_STREAMING,
};

export default config;


