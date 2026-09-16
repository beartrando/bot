import jwt from "jsonwebtoken";

import SessionAccessToken from "../../domain/session/value-objects/session-access-token.vo";

import TokenService from "../../application/ports/token-service.port";
import AuthConfig from "./interfaces/auth-config";
import TokenPayload from "./interfaces/token-payload";
import UserId from "../../domain/user/value-objects/user-id.vo";
import AnonymousSignInUseCase from "../../application/use-cases/auth/anonimous-sign-in";
import DeviceDeviceId from "../../domain/device/value-objects/device-device-id.vo";
import logger from "@shared/logger";
import sleep from "../../utils/sleep";
import AuthObject from "../../domain/auth/value-objects/auth-object.vo";
import RefreshTokensUseCase from "../../application/use-cases/auth/refresh-tokens";
import {TokenExpiredError} from "@shared/errors";


export class AuthService implements TokenService {
    private authObject: AuthObject | null = null;
    private authenticationPromise: Promise<void> | null = null;
    private stopping = false;

    constructor(
        private readonly config: AuthConfig,
        private readonly anonymousSignInUseCase: AnonymousSignInUseCase,
        private readonly refreshTokensUseCase: RefreshTokensUseCase,
        private readonly deviceId: DeviceDeviceId,
    ) {
    }

    get accessToken(): SessionAccessToken {
        if (!this.authObject) {
            throw new Error("Not authenticated");
        }

        return this.authObject.accessToken;
    }

    async ensureAuthenticated(): Promise<void> {
        if (this.authenticationPromise) {
            return this.authenticationPromise;
        }

        this.authenticationPromise = this.ensureAuthentication()
            .finally(() => {
                this.authenticationPromise = null;
            });

        return this.authenticationPromise;
    }

    private async ensureAuthentication(): Promise<void> {
        if (!this.authObject) {
            await this.authenticate();
            return;
        }

        try {
            this.verifyAccessToken(this.accessToken);
        } catch (error) {
            if (!(error instanceof jwt.TokenExpiredError)) {
                throw error;
            }

            await this.refreshTokens();
        }
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

    getUserId(): UserId {
        if (!this.authObject) {
            throw new Error("Not authenticated");
        }

        return this.verifyAccessToken(this.authObject.accessToken);
    }

    verifyAccessToken(accessToken: SessionAccessToken): UserId {
        const payload = this.payload(
            accessToken,
            this.config.accessSecret,
        );

        return new UserId(payload.sub);
    }

    private async authenticate(): Promise<void> {
        this.authObject = await this.anonymousSignInUseCase.execute(
            this.deviceId,
        );
    }

    private async refreshTokens(): Promise<void> {
        if (!this.authObject) {
            throw new Error("Not authenticated");
        }

        try {
            this.authObject = await this.refreshTokensUseCase.execute(
                this.authObject.refreshToken,
            );
        } catch (err) {
            logger.log(err);
            this.authObject = null;

            await this.authenticate();
        }
    }

    private payload(
        token: SessionAccessToken,
        secret: jwt.Secret,
    ): TokenPayload {
        try {
            const payload = jwt.verify(token.value, secret) as TokenPayload;

            if (!payload.sub) {
                throw new Error("JWT payload missing sub");
            }

            return payload;
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                throw new TokenExpiredError();
            }

            throw e;
        }
    }
}

export default AuthService;
