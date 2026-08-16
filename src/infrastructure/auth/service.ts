import jwt from "jsonwebtoken";

import TokenService from "../../application/ports/token-service.port";
import Id from "../../domain/common/value-objects/id.vo";
import AuthConfig from "./interfaces/auth-config";
import TokenPayload from "./interfaces/token-payload";
import DeviceId from "../../domain/device/value-objects/device-id.vo";
import AnonymousSignInUseCase from "../../application/use-cases/auth/anonimous-sign-in";
import AuthObject from "../../domain/auth/value-objects/auth-object.vo";
import AccessToken from "../../domain/auth/value-objects/access-token.vo";
import sleep from "../../utils/sleep";
import logger from "@shared/logger";

export class AuthService implements TokenService {
    private authObject: AuthObject | null = null;
    private authenticationPromise: Promise<void> | null = null;
    private stopping = false;

    constructor(
        private readonly config: AuthConfig,
        private readonly anonymousSignInUseCase: AnonymousSignInUseCase,
        private readonly deviceId: DeviceId,
    ) {
    }

    get accessToken(): AccessToken {
        if (!this.authObject) {
            throw new Error("Not authenticated");
        }

        return this.authObject.accessToken;
    }

    async ensureAuthenticated(): Promise<void> {
        if (this.authObject) {
            return;
        }

        if (this.authenticationPromise) {
            return this.authenticationPromise;
        }

        this.authenticationPromise = this.authenticate()
            .finally(() => {
                this.authenticationPromise = null;
            });

        return this.authenticationPromise;
    }

    async start(): Promise<void> {
        this.stopping = false;

        while (!this.stopping) {
            try {
                await this.ensureAuthenticated();

                // logger.info("✅ Authenticated");

                return;
            } catch (err) {
                if (this.stopping) {
                    return;
                }

                logger.warn(
                    {err},
                    "⏳ Authentication failed, retrying...",
                );

                await sleep(3000);
            }
        }
    }

    async stop(): Promise<void> {
        this.stopping = true;
        this.authObject = null;
    }

    async check(): Promise<boolean> {
        return !!this.authObject;
    }

    getUserId(): Id {
        if (!this.authObject) {
            throw new Error("Not authenticated");
        }

        return this.verifyAccessToken(this.authObject.accessToken);
    }

    verifyAccessToken(accessToken: AccessToken): Id {
        const payload = this.payload(
            accessToken.value,
            this.config.accessSecret,
        );

        return new Id(payload.sub);
    }

    private async authenticate(): Promise<void> {
        this.authObject = await this.anonymousSignInUseCase.execute(
            this.deviceId,
        );
    }

    private payload(
        token: string,
        secret: jwt.Secret,
    ): TokenPayload {
        const payload = jwt.verify(token, secret) as TokenPayload;

        if (!payload.sub) {
            throw new Error("JWT payload missing sub");
        }

        return payload;
    }
}

export default AuthService;
