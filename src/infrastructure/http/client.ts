import http from "node:http";
import logger from "@shared/logger";
import RequestOptionsInterface from "./interfaces/request-options.interface";

export class HttpClient {

    constructor(
        private readonly host: string,
        private readonly port: number,
    ) {
    }

    public async get(uri: string, requestOptions?: RequestOptionsInterface): Promise<any> {
        return await this.request(uri, 'GET', requestOptions);
    }

    public async post(uri: string, requestOptions?: RequestOptionsInterface): Promise<any> {
        return await this.request(uri, 'POST', requestOptions);
    }

    public async delete(uri: string, requestOptions?: RequestOptionsInterface): Promise<any> {
        return await this.request(uri, 'DELETE', requestOptions);
    }

    public async put(uri: string, requestOptions?: RequestOptionsInterface): Promise<any> {
        return await this.request(uri, 'PUT', requestOptions);
    }

    public async patch(uri: string, requestOptions?: RequestOptionsInterface): Promise<any> {
        return await this.request(uri, 'PATCH', requestOptions);
    }

    private async request(
        uri: string,
        method: string = "GET",
        requestOptions?: RequestOptionsInterface,
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers: Record<string, string | number> = {
                "Content-Type": "application/json",
                ...requestOptions?.headers,
            };

            let data = '';
            if (requestOptions?.request) {
                data = JSON.stringify(requestOptions.request);
                headers["Content-Length"] = Buffer.byteLength(data);
            }

            const options = {
                hostname: this.host,
                port: this.port,
                path: `/${uri}`,
                method,
                headers,
            };

            const req = http.request(options, (res) => {
                let body = "";
                res.on("data", (chunk) => (body += chunk));
                res.on("end", () => {
                    try {
                        const response = JSON.parse(body);
                        resolve(response);
                    } catch (err) {
                        logger.error(body);
                        reject(err);
                    }
                });
            });

            // logger.log(options);

            req.on("error", (err) => {
                if ((err as NodeJS.ErrnoException).code === "ECONNREFUSED") {
                    reject(new Error(`Gateway unavailable at ${this.host}:${this.port}`));
                } else {
                    reject(err);
                }
            });

            if (requestOptions?.request) {
                req.write(data);
            }
            req.end();
        });
    }
}

export default HttpClient;

