import HttpClient from "../../../infrastructure/http/client";
import AuthObject from "../../../domain/auth/value-objects/auth-object.vo";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import SessionRefreshToken from "../../../domain/session/value-objects/sesion-refresh-token.vo";

export class RefreshTokensUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(refreshToken: SessionRefreshToken): Promise<AuthObject> {


        // logger.info('signIn', deviceId);
        const resp = await this.httpClient.post("auth/refreshTokens", {body: {token: refreshToken.value}});
        // logger.info('signIn', resp);

        if (!resp?.auth) {
            throw new Error("Not authenticated");
        }

        return new AuthObject(new SessionAccessToken(resp?.auth.accessToken), new SessionRefreshToken(resp?.auth.refreshToken));
    }
}

export default RefreshTokensUseCase;

