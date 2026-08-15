import jwt from "jsonwebtoken";


import TokenService from "../../application/ports/token-service.port";
import Id from "../../domain/common/value-objects/id.vo";
import AuthConfig from "./interfaces/auth-config";
import TokenPayload from "./interfaces/token-payload";
import DeviceId from "../../domain/device/value-objects/device-id.vo";
import AnonymousSignInUseCase from "../../application/use-cases/auth/anonimous-sign-in";
import AuthObject from "../../domain/auth/value-objects/auth-object.vo";
import AccessToken from "../../domain/auth/value-objects/access-token.vo";


export class AuthService implements TokenService {

    private authObject: AuthObject | null = null;

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
        this.authObject = await this.anonymousSignInUseCase.execute(
            this.deviceId,
        );
    }

    async start(): Promise<void> {
        await this.ensureAuthenticated();
    }

    async stop() {
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
