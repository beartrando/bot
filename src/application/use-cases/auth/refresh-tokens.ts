import HttpClient from "../../../infrastructure/http/client";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import SessionRefreshToken from "../../../domain/session/value-objects/sesion-refresh-token.vo";
import SessionEntity from "../../../domain/session/session-entity";

export class RefreshTokensUseCase {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    async execute(refreshToken: SessionRefreshToken): Promise<SessionEntity> {


        // logger.info('signIn', deviceId);
        const resp = await this.httpClient.post("auth/refreshTokens", {body: {token: refreshToken.value}});
        // logger.info('signIn', resp);

        if (!resp?.session) {
            throw new Error("Not authenticated");
        }

        return new SessionEntity(new SessionAccessToken(resp?.session.accessToken), new SessionRefreshToken(resp?.session.refreshToken));
    }
}

export default RefreshTokensUseCase;
