import http from "node:http";
import logger from "@shared/logger";
import AccessToken from "../../domain/common/value-objects/access-token.vo";

export class HttpClient {

    private _accessToken: AccessToken | null = null;

    constructor(
        private readonly host: string,
        private readonly port: number,
    ) {
    }

    get accessToken(): AccessToken | null {
        return this._accessToken;
    }

    set accessToken(accessToken: AccessToken) {
        this._accessToken = accessToken;
    }

    public async get(uri: string, request?: object): Promise<any> {
        return await this.request(uri, request, 'GET');
    }

    public async post(uri: string, request?: object): Promise<any> {
        return await this.request(uri, request, 'POST');
    }

    public async delete(uri: string, request?: object): Promise<any> {
        return await this.request(uri, request, 'DELETE');
    }

    public async put(uri: string, request?: object): Promise<any> {
        return await this.request(uri, request, 'PUT');
    }

    public async patch(uri: string, request?: object): Promise<any> {
        return await this.request(uri, request, 'PATCH');
    }

    private async request(
        uri: string,
        request?: object,
        method: string = "GET"
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            // logger.info(
            //   uri,
            //   request,
            //   method,
            // );

            const headers: Record<string, string | number> = {
                "Content-Type": "application/json",
            };

            let data = '';
            if (request) {
                data = JSON.stringify(request);
                headers["Content-Length"] = Buffer.byteLength(data);

            }

            if (this._accessToken) {
                headers["Authorization"] = "Bearer " + this._accessToken.value;
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

            if (request) {
                req.write(data);
            }
            req.end();
        });
    }
}

export default HttpClient;

