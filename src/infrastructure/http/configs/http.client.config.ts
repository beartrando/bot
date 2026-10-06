const [envHost, envPort] = (process.env.HTTP_GATEWAY ?? "gateway:8080").split(":");
const host = envHost ?? "gateway";
const port = Number(envPort ?? 8080);
const url = host + ':' + port;


export const httpClientConfig = {
    host,
    port,
    url,
};

export default httpClientConfig;
