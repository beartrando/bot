const [host, portStr] = (process.env.HTTP_GATEWAY ?? "gateway:8080").split(":");
const httpGatewayHost = host ?? "gateway";
const httpGatewayPort = Number(portStr) ?? 8080;
const httpGateway = httpGatewayHost + ':' + httpGatewayPort;


export const httpConfig = {
    httpGatewayHost: httpGatewayHost,
    httpGatewayPort: httpGatewayPort,
    httpGateway: httpGateway,
};

export default config;


